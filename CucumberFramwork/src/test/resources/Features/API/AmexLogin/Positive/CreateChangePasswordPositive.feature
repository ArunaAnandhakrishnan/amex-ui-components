@BTAChangePassword @API @Positive

Feature: Create BTA Change Password Positive Scenario with Change Password API

  @BTAChangePassword @Sanity
  Scenario: User Create Registration and perform Login & Change Password
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration"
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "201"
    And i have following values from the transaction
      | locator       | varname   |
      | data.username | #UserName |
    Given i have "BTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | #UserName |
      | password | Test@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And i have following values from the transaction
      | locator          | varname      |
      | data.accessToken | #AccessToken |
    Given i have "CreateChangePasswordEndpoint" api request with template "CreateChangePassword" and following details
      | currentPassword | Test@1234  |
      | newPassword | Test@12345 |
    When i POST "CreateChangePasswordEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator | value                         |
      | success | true                          |
      | message | Password changed successfully |