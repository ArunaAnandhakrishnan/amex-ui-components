package StepDefinitions.UI;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaPaymentAllocation {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaPaymentAllocation() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Payment Allocation Section")
    public void clickPaymentAllocation() {
        By PaymentAllocationsButton = By.xpath("//a[normalize-space()='Payment Allocation']");
        uiHelper.click(PaymentAllocationsButton);
        LoggerUtils.logInfo("Clicked the Payment Allocation Section");
    }

    @Then("User Select the BTA Number and click the View Payment Allocation")
    public void selectBtaNumberAndViewPaymentAllocation() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-payment-allocation/div/div/div[2]/div[1]/select"), "BTACLIENTBAH001-3744XXXXXXX5229");
        uiHelper.click(By.xpath("//button[normalize-space()=\"Open Unbilled Transaction List\"]"));
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-payment-allocation/div/div[2]/div[2]/table/tbody/tr[1]/td[6]/input"));
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-payment-allocation/div/div[2]/div[2]/table/tbody/tr[2]/td[6]/input"));
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-payment-allocation/div/div[2]/div[2]/div/button"));
    }

    @Then("User Verify the allocated transactions are displayed")
    public void verifyAllocatedTransactions() {
        uiHelper.assertAndAcceptAlertPopup("Selected transactions allocated successfully.");
}}
