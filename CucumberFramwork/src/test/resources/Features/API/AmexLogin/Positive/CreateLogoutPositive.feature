@BTALogout @API @Positive

Feature: Create BTA Logout Positive Scenario with Logout API

  @CreateBTARegistration @Sanity
  Scenario: User Create BTA Logout with Valid Access Token
    Given i have "CreateBTARegistrationEndpoint" api request with template "CreateBTARegistration"
    When i POST "CreateBTARegistrationEndpoint" api request
    Then the http status code should be "201"
    And the following response details should be present
      | locator     | value                   |
      | success     | true                    |
      | message     | Registration successful |
      | data.userId | #should be present      |
    And i have following values from the transaction
      | locator       | varname   |
      | data.username | #UserName |
    Given i have "BTALoginEndpoint" api request with template "CreateBTALogin" and following details
      | username | #UserName |
      | password | Test@1234 |
    When i POST "CreateBTALoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |
    And i have following values from the transaction
      | locator          | varname      |
      | data.accessToken | #AccessToken |
    When i POST "CreateBTALogoutEndpoint" api request
    Then the http status code should be "200"