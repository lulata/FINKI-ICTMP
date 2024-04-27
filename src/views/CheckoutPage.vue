<template>
    <div class="container">
      <h3>
        Checkout
      </h3>
        <div class="row">
          <div class="col">
            <h4>Shipping Details</h4>
            <div class="input-group">
              <input type="text" class="form-control" aria-label="First Name" placeholder="First Name">
              <input type="text" class="form-control" aria-label="Last Name" placeholder="Last Name">
            </div>
            <div class="input-group">
              <input type="text" class="form-control" aria-label="Adress" placeholder="Adress">
            </div>
            <div class="input-group">
              <input type="text" class="form-control" aria-label="City" placeholder="City">
              <input type="text" class="form-control" aria-label="Postal Code" placeholder="Postal Code">
            </div>
            <div data-mdb-input-init class="form-outline">
                <input type="tel" id="typePhone" class="form-control" placeholder="Telephone number" />
            </div>
          </div>
          <div class="col">
            <h4>Your Order</h4>
            random componenta za import
            <p>Subtotal: </p>
            <p>Shipping: </p>
            <p>Total: </p>
          </div>
      </div>
    </div>
  </template>
  <style>
   .col{
    padding: 20px 10px;}
  </style>