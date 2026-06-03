@OnlsRegistration @API @Positive

Feature: Create BTA Logout Positive Scenario with Logout API

  @CreateOnlsRegistration @Negative
  Scenario: User Create Logout with Invalid Access Token
    Given i POST "CreateBTALogoutEndpoint" api request
    When the http status code should be "403"
#    Then the following response details should be present
#      | locator | value              |
#      | success | false              |