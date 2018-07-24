$PATH = [Environment]::GetEnvironmentVariable("PATH")
#$xampp_path = "C:\Users\ms458j\AppData\Local\Programs\Git\bin"
#$xampp_path = "C:\Users\ms458j\AppData\Local\Programs\Git\usr\bin"
#$xampp_path = "C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64"
#$xampp_path = "C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64\Scripts"
$xampp_path = 'C:\Users\ms458j\Documents\IT_Learninig\node-v9.11.1-win-x64'
[Environment]::SetEnvironmentVariable("PATH", "$PATH;$xampp_path", "Machine")


#$PATH="C:\ProgramData\Oracle\Java\javapath;C:\oracle\product\11.1.0\bin;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Program Files (x86)\Attachmate\Reflection\;C:\Program Files (x86)\Attachmate\e!e2k\;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\WindowsPowerShell\v1.0\;%;S_TOOLS%;C:\Program Files (x86)\WebEx\Productivity Tools;%JAVA_HOME%\bin;C:\Users\ms458j\AppData\Local\Programs\Git\bin"
#[Environment]::SetEnvironmentVariable("PATH", "$PATH", "Machine")
