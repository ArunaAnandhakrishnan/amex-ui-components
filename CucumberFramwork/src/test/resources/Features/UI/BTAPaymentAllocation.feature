@UI @BTA

Feature: BTA Payment Allocation in AEME Portal

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button
    And I should see the ONLS Helper Tool Home Page

  @Sanity @PaymentAllocation_Test_01
  Scenario: Verify BTA Payment Allocation functionality
    When Click the Payment Allocation Section
    Then User Select the BTA Number and click the View Payment Allocation
    And User Verify the allocated transactions are displayed
#    Then User Select the BTA Number and generate the Monthly report
#    And User Verify the generated report is displayed in the Large Report Section