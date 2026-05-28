@AmexWearable @API

Feature: Create Amex Wearable

  @CreateWearables @Sanity
  Scenario: Create Amex Wearables
    Given i have "IssueWearable" api request with template "IssueWearable" and following details
      | clientCode   | 22222            |
      | selectedCard | 3755 XXXXXX 2200 |
    When i POST "IssueWearables" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator         | value  |
      | success         | true   |
      | data.nfcEnabled | true   |
      | data.status     | Issued |
#   And i have following values from the transaction
#      | locator   | varname   |
#      | bookingid | BookingId |