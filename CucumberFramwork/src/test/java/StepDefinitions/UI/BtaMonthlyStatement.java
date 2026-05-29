package StepDefinitions.UI;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaMonthlyStatement {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaMonthlyStatement() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Monthly Statement Section")
    public void clickMonthlyStatement() {
        By MonthlyStatementButton = By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[1]/a[4]");
        uiHelper.click(MonthlyStatementButton);
        LoggerUtils.logInfo("Clicked the Monthly Statement Section");
    }

    @Then("User Select the BTA Number and generate the Monthly report")
    public void selectBtaNumberAndGenerateMonthlyReport() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-monthly-statement/div/div/div[2]/div[2]/select"), "BTACLIENTBAH002-3744XXXXXXX6130");
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-monthly-statement/div/div/div[2]/div[2]/button"));
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-monthly-statement/div/div/div[2]/div[8]/div[2]/button"));
    }

    @Then("User Verify the generated report is displayed in the Monthly Statement Section")
    public void verifyMonthlyReport() {
        uiHelper.assertAndDismissAlertPopup("Downloading February 2025 in PDF format");
    }

}
