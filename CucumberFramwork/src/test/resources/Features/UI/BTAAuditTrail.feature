@UI @BTA

Feature: BTA Memo Statement in AEME Portal

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button
    And I should see the ONLS Helper Tool Home Page
    And User Click the BTA Section

  @Sanity @AuditTrail_Test_01
  Scenario: Verify BTA Audit Trail functionality
    When Click the Audit Trail Section
    Then User Select the adit range and generate the report
    And User Verify the generated report is displayed in the Audit Trail Section