@UI @BTA @CorporateMasterAdmin

Feature: Verify that the Corporate Master Admin user can successfully access the BTA portal,
  navigate to all available sections,and validate their functionality.

  Background:
    Given Navigate to the AEME Portal
    When I enter username "corp.admin" and password "Corp@1234"
    Then I click the login button
    And I should see the MY BTA Home Page

  @Sanity @CaseManagement_Test_01
  Scenario: Verify BTA Case Management functionality
    When Click the Case Management Section
    Then User Submit the Case Management Request
    And User verify the Successful case submission in Case Management Section