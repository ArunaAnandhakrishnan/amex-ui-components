package Helper.Api;

import Context.TestContext;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import Utils.ConfigReader;
import Utils.LoggerUtils;

public class ApiHelper {

    String baseUrl = ConfigReader.getProperty("ApiBaseUrl");
    private TestContext context;

    public ApiHelper() {
    }

    public ApiHelper(TestContext context) {
        this.context = context;
    }

    public Response postAPI(String endpoint, String body) {
        String url = baseUrl + endpoint;

        // Store in TestContext for reporting
        if (context != null) {
            context.lastRequestUrl = url;
            context.lastRequestBody = body;
        }

        LoggerUtils.logRequest(url, body);

        Response response = RestAssured
                .given()
                .header("Content-Type", "application/json")
                .body(body)
                .when()
                .post(url);

        // Store response details in TestContext
        if (context != null) {
            context.lastResponseStatusCode = response.getStatusCode();
            context.lastResponseBody = response.asPrettyString();
        }

        LoggerUtils.logResponse(response.getStatusCode(), response.asPrettyString());

        return response;
    }

    public Response getAPI(String endpoint) {
        String url = baseUrl + endpoint;

        // Store in TestContext for reporting
        if (context != null) {
            context.lastRequestUrl = url;
            context.lastRequestBody = "GET REQUEST";
        }

        LoggerUtils.logRequest(url, "GET REQUEST");

        Response response = RestAssured
                .given()
                .when()
                .get(url);

        // Store response details in TestContext
        if (context != null) {
            context.lastResponseStatusCode = response.getStatusCode();
            context.lastResponseBody = response.asPrettyString();
        }

        LoggerUtils.logResponse(response.getStatusCode(), response.asPrettyString());

        return response;
    }

    public Response putAPI(String endpoint, String body, String token) {
        String url = baseUrl + endpoint;

        // Store in TestContext for reporting
        if (context != null) {
            context.lastRequestUrl = url;
            context.lastRequestBody = body;
        }

        LoggerUtils.logRequest(url, body);
        Response response = RestAssured
                .given()
                .header("Content-Type", "application/json")
                .header("Cookie", "token=" + token)
                .body(body)
                .when()
                .put(url);

        // Store response details in TestContext
        if (context != null) {
            context.lastResponseStatusCode = response.getStatusCode();
            context.lastResponseBody = response.asPrettyString();
        }

        LoggerUtils.logResponse(response.getStatusCode(), response.asPrettyString());

        return response;
    }
}