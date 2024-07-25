using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateProductDto
{
    [Required]
    public required string Name { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    [Range(100, Double.PositiveInfinity)]
    public required long Price { get; set; }

    [Required]
    public required IFormFile File { get; set; }

    [Required]
    public required string Type { get; set; }

    [Required]
    public required string Brand { get; set; }

    [Required]
    [Range(0, 10000)]
    public required int QuantityInStock { get; set; }
}