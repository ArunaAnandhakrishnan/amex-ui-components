@UI @Login

Feature: Login Functionality

  Background:
    Given Navigate to the AEME Portal

  @Sanity @Login_Test_01
  Scenario: User Login with valid credentials
    When I enter username "corp.admin" and password "Corp@1234"
    And I click the login button
    And I should see the ONLS Helper Tool Home Page

#  @UI
#  Scenario Outline: Login with different credentials
#    When I enter username "<username>" and password "<password>"
#    And I click the login button
#    Then I should see an error message "<error_message>"
#
#    Examples:
#      | username    | password  | error_message                      |
#      |             | admin     | Username is required               |
#      | admin       |           | Password is required               |
#      |             |           | Username and password are required |
#      | invaliduser | wrongpass | Invalid username or password       |
#
#  @UI
#  Scenario: Forgot password
#    When I click the forgot password link
#    Then I should see the forgot password form
#
#  @UI
#  Scenario: Login button state
#    When I enter username "admin"
#    Then the login button should be disabled
#    When I enter password "password123"
#    Then the login button should be enabled
