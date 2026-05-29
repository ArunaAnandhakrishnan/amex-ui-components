package Utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import Context.TestContext;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.Map;

public class FileUtils {

    ObjectMapper mapper = new ObjectMapper();

    public String getDataFromTemplate(String fileName) throws Exception {
        return new String(Files.readAllBytes(Paths.get("src/test/resources/TestData/" + fileName)));
    }

    public String updateDataWithScenarioDataTableInfo(TestContext context, Map<String, String> map, String jsonRequest) throws Exception {
        JsonNode rootNode = mapper.readTree(jsonRequest);
        updateJsonNode(context, rootNode, map);
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
    }

    public void updateJsonNode(TestContext context, JsonNode node, Map<String, String> map) {
        Iterator<Map.Entry<String, JsonNode>> fields = node.fields();

        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            String fieldName = field.getKey();
            JsonNode childNode = field.getValue();

            if (map.containsKey(fieldName)) {
                String value = map.get(fieldName);

                try {
                    // # -> runtime stored value
                    if (value.startsWith("#")) {
                        if (context.getDataStore().containsKey(value)) {
                            String valueToBeAdded = context.getDataStore().get(value);
                            updateNodeValue(node, fieldName, childNode, valueToBeAdded);
                        } else {
                            throw new RuntimeException("Missing variable from datastore : " + value);
                        }
                    }
                    // @ -> datastore value
                    else if (value.startsWith("@")) {
                        String data = context.getDataStore().get(value.substring(1));
                        updateNodeValue(node, fieldName, childNode, data);
                    }
                    // * -> random value
                    else if (value.startsWith("*")) {
                        String randomValue = getRandomValue(value);
                        updateNodeValue(node, fieldName, childNode, randomValue);
                    }
                    // null handling
                    else if (value.equals("null")) {
                        ((ObjectNode) node).putNull(fieldName);
                    }
                    // normal values
                    else {
                        updateNodeValue(node, fieldName, childNode, value);
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }

            if (childNode.isObject()) {
                updateJsonNode(context, childNode, map);
            }
        }
    }

    public void updateNodeValue(JsonNode node, String fieldName, JsonNode childNode, String value) {
        // Integer handling
        if (childNode.isInt()) {
            ((ObjectNode) node).put(fieldName, Integer.parseInt(value));
        }
        // Boolean handling
        else if (childNode.isBoolean()) {
            ((ObjectNode) node).put(fieldName, Boolean.parseBoolean(value));
        }
        // String handling
        else {
            ((ObjectNode) node).put(fieldName, value);
        }
    }

    public String getRandomValue(String value) {
        if (value.equals("*randomNumber")) {
            return String.valueOf((int) (Math.random() * 100000));
        }

        if (value.equals("*randomName")) {
            return "User" + (int) (Math.random() * 1000);
        }

        return value;
    }
}

