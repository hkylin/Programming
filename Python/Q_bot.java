    
   public int send(String to, String botId, String botPassword, String friendlyBotName, String htmlMessage) throws IOException {
        URL botserviceURL = new URL("http://bots.q.att.com:9015/QBotService/BotTalk?json=true");
        HttpURLConnection botserviceConnection = (HttpURLConnection) botserviceURL.openConnection();
        botserviceConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        botserviceConnection.setRequestMethod("POST");
        botserviceConnection.setDoOutput(true);

        JsonObject message = new JsonObject();
        message.addProperty("to", to);
        message.addProperty("from", botId);
        message.addProperty("password", botPassword);
        message.addProperty("displayfromname", friendlyBotName);
        message.addProperty("html", htmlMessage);

        OutputStreamWriter writer = new OutputStreamWriter(botserviceConnection.getOutputStream());
        writer.write(message.toString());
        writer.flush();

        writer.close();
        botserviceConnection.disconnect();

        return botserviceConnection.getResponseCode();