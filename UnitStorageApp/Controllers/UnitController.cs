using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Services.Interfaces;
using UnitStorageApp.Services.DTO;
using UnitStorageApp.Services.Infrastructure;
using Microsoft.Extensions.Logging;

namespace UnitStorageApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        private readonly ILogger<UnitController> _logger;
        private readonly IUnitService _service;

        public UnitController(ILogger<UnitController> logger, IUnitService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<UnitDTO>>> GetAll()
        {
            var units = await _service.GetAll();
            return Ok(units);
        }

        [HttpPost("create")]
        public async Task<ActionResult<UnitDTO>> Create([FromBody] UnitDTO unitDto)
        {
            await _service.Create(unitDto);
            return Ok();
        }

        [HttpGet("edit/{id}")]
        public async Task<ActionResult<UnitDTO>> Edit(string id)
        {
            try
            {
                var unit = await _service.GetById(id);
                return Ok(unit);
            }
            catch (ValidationException ex)
            {
                _logger.LogError(ex.Message);
                return NotFound();
            }
        }

        [HttpPut("edit")]
        public async Task<ActionResult> Edit(UnitDTO unitDto)
        {
            await _service.Update(unitDto);
            return Ok();
        }

        [HttpDelete("remove/{id}")]
        public async Task<ActionResult<UnitDTO>> Remove(string id)
        {
            await _service.Remove(id);
            return Ok();
        }

        [HttpGet("attack/{attackerId}/{defenderId}")]
        public async Task<ActionResult<IEnumerable<UnitDTO>>> Attack(string attackerId, string defenderId)
        {
            try
            {
                var units = await _service.Attack(attackerId, defenderId);
                return Ok(units);
            }
            catch (ValidationException ex)
            {
                _logger.LogError(ex.Message);
                return NotFound();
            }
        }
    }
}
