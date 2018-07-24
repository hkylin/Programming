
#########################
#Send Message
#########################
#format
#xmlMessage=<message type="contact.send.message" id="" password="" contactId=""> 
#<statement from="" to="" text=""/>
#</message>

$contactId = "ms458j"
$to="ms458j"
$from="Mayur_Boat"
$id = "ms458j@intl.att.com"
$password = "Rocktheparty123"
$botUrl = "http://bots.q.att.com:9015/QBotService/BotTalk?"
#$message = Get-ChildItem R:\AGING
#$message1=""
#foreach ($item in $message)
#{$message1 += (
#"[table]
#[tr][th colspan=4 style='background:#DFDFDF'][font color='#006400']"+"File Name "+"[/th]"+"[td]"+$item.FullName+"[/td]"+"[th]"+" File Write Time [/th]"+"[td]"+$item.lastwritetime+"[td]")}
#$message = $message.Replace("%", "%25")

$htmlData = Get-WmiObject -Class CIM_Display | Select-Object -Property DeviceID,MonitorManufacturer,Name,ScreenHeight,ScreenWidth| ConvertTo-Html -Fragment
$htmlData = $htmlData -replace "\<","["
$htmlData = $htmlData -replace "\>","]"
$htmlData = $htmlData -replace '"',"'"
#$htmlData = $htmlData -replace "\%",""
$Message  = $htmlData
#$Message = Get-Content .\message-new.txt
<# "[table]"`
+("[tr][th colspan=4 style='background:#DFDFDF'][p][span style='font-size:10.5pt']")+("Daily Morning Jobs for Date:- Wednesday 22-Jun-2016")+("[/span][/p][/th][/tr]")`
+("[tr][th]")+("MDB Name")+("[/th][th]")+("MDB Run Time")+("[/th][th]")+("MDB Run Status")+("[/th]")`
+("[tr][td]")+("ExpressPayNotes.mdb")+("[/td][td]")+("08/07/2015 09:26:22")+("[/td][td]")+("Pending[/td][/tr]")`
+("[tr][td]")+("XPAY_Audit.mdb")+("[/td][td]")+("08/07/2015 09:26:34")+("[/td][td]")+("Pending[/td][/tr]")`
+("[tr][td]")+("MIS_LAC_1.mdb")+("[/td][td]")+("06/22/2016 08:47:29")+("[/td][td]")+("Completed[/td][/tr]")`
+("[/table]") #>

[String]$Xml= "xmlMessage=
<message type=`"contact.send.message`" id=`"$id`" password=`"$password`" contactId=`"$contactId`">
<statement from=`"$from`" to=`"$To`" text=`"$message`"/>
</message>"
#[String]$Xml= 'xmlMessage=<message type="contact.send.message" id="'+$id+'" password="'+$password+'" contactId="'+$contactId+'"><statement from="'+$from+'" to="'+$To+'" text="'+$message+'"/></message>'
#$Xml | Out-GridView

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement
$result.DocumentElement.info

#########################
# Get list of person who has sent message to boat or boat monitoring the message in room
#########################
#Use "contact.get.list" to see who has sent you messages: 
#format
#<message type="contact.get.list" id="mybot" password="mypassword" />
#$contactId = "q_rooms_ms458j1466551962988"
$contactId = "ms458j"

[String]$Xml= "xmlMessage=
<message type=`"contact.get.list`" id=`"$id`" password=`"$password`" contactId=`"$contactId`"></message>"

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement.contact | Format-Table -Wrap -AutoSize

#########################
#Get Message from contacts
#########################
#<message type="contact.get.messages" id="mybot" password="mypassword" contactId="ab1234" />
#$contactId = ("q_rooms_sp069t1477576295583","q_rooms_ms458j1466551962988") does not work, do not take array
#$contactId="cbustmprod@aotscbus.ims.att.com" not working
$contactId = "q_rooms_ms458j1466551962988"
#$contactId = "q_rooms_sp069t1477576295583"
#$contactId="ms458j"  ## Contact who sending message , see contact.get.list for list of conatcts
[String]$Xml= "xmlMessage=<message type=`"contact.get.messages`" id=`"$id`" password=`"$password`" contactId=`"$contactId`"></message>"
#[String]$Xml= 'xmlMessage=<message type="contact.get.messages" id="'+$id+'" password="'+$password+'" contactId="'+$contactId+'"></message>'

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement
$result.DocumentElement.messagesPending
$result.DocumentElement.statement | ft -Wrap -AutoSize
<# $M.Content | Out-File C:\temp\test.xml
explorer.exe C:\temp\
$str = $M.Content -replace '<Message type','Message_Type'
$str = $str -replace "\<|\>|\/",""
$str = $str -replace ' ',"`n"
ConvertFrom-StringData -StringData $str #>


#########################
# Publishing to a Meeting qto://meeting/q_rooms_ms458j1466551962988/q_rooms_ms458j1466551962988
#########################
#format 
#<message type="contact.send.message" id="mybot" password="mypass" contactId="q_room_ab12340121251">
#<statement from="mybot" to="q_room_ab12340121251" text="" type="meeting"/>
#</message>
$message = "Hi"
$contactId = "q_rooms_ms458j1466551962988"
$to="q_rooms_ms458j1466551962988"

[String]$Xml="xmlMessage=
<message type=`"contact.send.message`" id=`"$id`" password=`"$password`" contactId=`"$contactId`">
<statement from=`"$from`" to=`"$To`" text=`"$message`" type=`"meeting`"/>
</message>"

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement


#########################
## Subscribe to Meeting
#########################
## Tells the Bot Service to maintain your Bot in the meeting until you send an Unsubscribe.
## <message type="meeting.command" id="mybot" password="mypass" meetingId="q_room_ab12340121251" command="subscribe" />
$MeetingId = "q_rooms_sp069t1477576295583" # Omnibill Team
#$meetingId='q_rooms_ms458j1466551962988'
[String]$Xml="xmlMessage=
<message type=`"meeting.command`" id=`"$id`" password=`"$password`" meetingId=`"$meetingId`" command=`"subscribe`">
</message>"

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement
$result.DocumentElement.messagesPending

##Unsubscribe from Meeting
## Tells the Bot Service to remove you from the meeting, reverting back to the default publishing behavior.
##<message type="meeting.command" id="mybot" password="mypass" meetingId="q_room_ab12340121251" command="unsubscribe" />
$meetingId='q_rooms_ms458j1466551962988'
[String]$Xml="xmlMessage=
<message type=`"meeting.command`" id=`"$id`" password=`"$password`" meetingId=`"$meetingId`" command=`"unsubscribe`">
</message>"

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement
$result.DocumentElement.messagesPending

## unsubscribe from all meetings
##<message type="meeting.command" id="mybot" password="mypass" meetingId="all" command="unsubscribe" />


##Meeting Roster
##<message type="meeting.command" id="mybot" password="mypass" meetingId="q_room_ab12340121251" command="roster" />
#$MeetingId = "q_rooms_sp069t1477576295583" # Omnibill Team
$MeetingId = "q_rooms_ms458j1466551962988"
[String]$Xml="xmlMessage=
<message type=`"meeting.command`" id=`"$id`" password=`"$password`" meetingId=`"$meetingId`" command=`"roster`">
</message>"

$M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
[xml]$result= $M.Content
$result.DocumentElement
$result.DocumentElement.messagesPending


#########################
#Send Meeting Invitation
#########################
#<message type="meeting.command" id="mybot" password="mypass" meetingId="q_room_ab12340121251" meetingName="Meeting Room" contactId="ab1234" command="invite" />
$contactId = 'ms458j'
$MeetingId = "q_rooms_ms458j1466551962988"
[String]$Xml="xmlMessage=
<message type=`"meeting.command`" id=`"$id`" password=`"$password`" meetingId=`"$meetingId`" meetingName=`"Meeting Room`" contactId=`"$contactId`" command=`"invite`">
</message>"

    $M = Invoke-WebRequest -Uri $botUrl -Body $Xml -Method Post
    [xml]$result= $M.Content
    $result.DocumentElement
    $result.DocumentElement.messagesPending