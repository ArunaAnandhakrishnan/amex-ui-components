package Utils;

public class LoggerUtils {

    public static void logRequest(
            String url) {

        System.out.println(
                "\n========== API REQUEST =========="
        );

        System.out.println(
                "URL : " + url
        );
    }

    public static void logInfo(String message) {
        System.out.println("[INFO] " + message);
    }

    public static void logResponse(
            int statusCode,
            String responseBody) {

        System.out.println(
                "\n========== API RESPONSE =========="
        );

        System.out.println(
                "STATUS CODE : "
                        + statusCode
        );

        System.out.println(
                "RESPONSE BODY : \n"
                        + responseBody
        );
    }
}