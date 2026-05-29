@UI @Login

Feature: BTA User Management in AEME Portal

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button
    And I should see the ONLS Helper Tool Home Page

  @CreateNewUser_Test_01 @Sanity
  Scenario: User create New User in User Management Section
    When Click the User Management Section
    Then Fill in the user details and save
#    And  User wait for few seconds
#   Then User should see the new user created successfully message