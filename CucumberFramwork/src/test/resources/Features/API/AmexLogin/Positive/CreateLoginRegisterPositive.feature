@OnlsRegistration @API @Positive

Feature: Create Registration Positive Scenario with Registration API

  @CreateOnlsRegistration @Sanity
  Scenario: User Create Registration
    Given i have "CreateOnlsRegistrationEndpoint" api request with template "CreateOnlsRegistration"
    When i POST "CreateOnlsRegistrationEndpoint" api request
    Then the http status code should be "201"
    And the following response details should be present
      | locator     | value                   |
      | success     | true                    |
      | message     | Registration successful |
      | data.userId | #should be present      |

  @CreateOnlsRegistration @Sanity
  Scenario: User Create Registration and perform Login & Logout
    Given i have "CreateOnlsRegistrationEndpoint" api request with template "CreateOnlsRegistration"
    When i POST "CreateOnlsRegistrationEndpoint" api request
    Then the http status code should be "201"
    And the following response details should be present
      | locator     | value                   |
      | success     | true                    |
      | message     | Registration successful |
      | data.userId | #should be present      |
    And i have following values from the transaction
      | locator       | varname   |
      | data.username | #UserName |
    Given i have "ONLSLoginEndpoint" api request with template "CreateOnlsLogin" and following details
      | username | #UserName |
      | password | Test@1234 |
    When i POST "CreateOnlsLoginEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator           | value              |
      | success           | true               |
      | data.accessToken  | #should be present |
      | data.refreshToken | #should be present |