@OnlsRegistration @API @Positive

Feature: Create ONLS Logout Positive Scenario with Logout API

  @CreateOnlsRegistration @Negative
  Scenario: User Create ONLS Logout with Invalid Access Token
    Given i POST "CreateOnlsLogoutEndpoint" api request
    When the http status code should be "401"
    Then the following response details should be present
      | locator | value              |
      | success | false              |