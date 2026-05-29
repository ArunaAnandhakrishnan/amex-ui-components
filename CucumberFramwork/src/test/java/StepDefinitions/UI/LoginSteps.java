package StepDefinitions.UI;

import Helper.UI.UiHelper;
import Context.TestContext;
import io.cucumber.java.en.*;
import io.cucumber.java.ja.但し;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import Utils.ConfigReader;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

import java.time.Duration;

import static org.testng.Assert.*;

public class LoginSteps {

    // ...existing fields...
    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;

    public LoginSteps(TestContext context) {

        this.context = context;

        driver = WebDriverManagerUtil.getDriver();

        wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        uiHelper = new UiHelper(driver);
    }

    @Given("Navigate to the AEME Portal")
    public void iAmOnTheLoginPage() {

        String loginUrl = ConfigReader.getProperty("uiBaseUrl");
        WebDriverManagerUtil.navigateTo(loginUrl);
        LoggerUtils.logInfo("Navigated to AEME Portal");
    }

    @When("I enter username {string} and password {string}")
    public void iEnterUsernameAndPassword(String username, String password) {
        uiHelper.enterText(By.xpath("//*[@id=\"username\"]"), username);
        uiHelper.enterText(By.xpath("//*[@id=\"password\"]"), password);
        LoggerUtils.logInfo("Entered username and password");
    }

    @When("I click the login button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath("/html/body/app-root/app-login/amex-login-form/div/div[4]/div[2]/div/div[4]/button"));

        LoggerUtils.logInfo("Clicked login button");
    }

    @Then("I should see the ONLS Helper Tool Home Page")
    public void iShouldSeeTheWelcomeMessage() {

        WebElement welcomeMessage = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//span[text()='ONLS Helper Tool']")
                ));

        assertTrue(welcomeMessage.isDisplayed(),
                "Home page is not displayed");

        LoggerUtils.logInfo("Home page landed successfully");
    }

@Then("User Click the BTA Section")
public void clickBTASection() {
    uiHelper.click(By.xpath("//span[contains(text(),'BTA')]"));
    LoggerUtils.logInfo("Clicked the BTA Section");
}

}