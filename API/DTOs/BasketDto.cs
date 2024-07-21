namespace API.DTOs;

public class BasketDto
{
    public int Id { get; set; }
    public required string BuyerId { get; set; }
    public required List<BasketItemDto> Items { get; set; }
    public string? PaymentIntentId { get; set; }
    public string? ClientSecret { get; set; }
}
