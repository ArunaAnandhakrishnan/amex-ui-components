@UI @BTA

Feature: BTA Monthly Statement in AEME Portal

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button
    And I should see the ONLS Helper Tool Home Page

  @Sanity @LargeReports_Test_01
  Scenario: Verify BTA Monthly Statement functionality
    When Click the Monthly Statement Section
    Then User Select the BTA Number and generate the Monthly report
    And User Verify the generated report is displayed in the Monthly Statement Section

