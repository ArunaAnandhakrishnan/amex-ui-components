package StepDefinitions.UI;

import Helper.UI.UiHelper;
import Context.TestContext;
import io.cucumber.java.en.*;
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

public class BTALoginSteps {

    // ...existing fields...
    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;

    public BTALoginSteps(TestContext context) {

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
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-shell/div/div[2]/div/div/app-bta-login/div/div[2]/div[2]/input"), username);
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-shell/div/div[2]/div/div/app-bta-login/div/div[2]/div[3]/input"), password);
        LoggerUtils.logInfo("Entered username and password");
    }

    @When("I click the login button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-shell/div/div[2]/div/div/app-bta-login/div/div[2]/div[5]/button"));
        LoggerUtils.logInfo("Clicked login button");
    }

    @Then("I should see the MY BTA Home Page")
    public void iShouldSeeTheWelcomeMessage() {
        WebElement welcomeMessage = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("/html/body/app-root/amex-page-shell/div/header/amex-top-nav-bar/div[2]/span")
                ));
        assertTrue(welcomeMessage.isDisplayed(),
                "Home page is not displayed");
        LoggerUtils.logInfo("Home page landed successfully");
    }
}