@AmexWearable @API

Feature: Booking API Validation

  Background:


  @GetWearableByClientCode @Sanity
  Scenario: Get Amex Wearable Client Data
    When i GET "GetClientData" api request
    Then the http status code should be "200"

