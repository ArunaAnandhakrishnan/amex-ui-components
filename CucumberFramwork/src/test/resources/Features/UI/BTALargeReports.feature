@UI @BTA

Feature: BTA Large Reports in AEME Portal

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button
    And I should see the ONLS Helper Tool Home Page

  @Sanity @LargeReports_Test_01
  Scenario: Verify BTA Large Report functionality
    When Click the Large Reports Section
    Then User Select the BTA Number and generate the report
    And User Verify the generated report is displayed in the Large Report Section

