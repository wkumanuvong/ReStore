﻿using API.Entities.OrderAggregate;

namespace API.DTOs;

public class CreateOrderDto
{
    public bool SaveAddress { get; set; }
    public required ShippingAddress ShippingAddress { get; set; }
}
