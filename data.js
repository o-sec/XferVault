var DefaultData = {
    "windows": {
        "web servers": [
            "python -m http.server #PORT",
            "python2 -m SimpleHTTPServer #PORT",
            "iisexpress /path:C:\\Path\\To\\Share /port:#PORT",
            "php -S 0.0.0.0:#PORT",
            "$root=(Get-Location).Path;$h=New-Object Net.HttpListener;$h.Prefixes.Add(\"http://+:#PORT/\");$h.Start();while($h.IsListening){$c=$h.GetContext();$p=Join-Path $root ($c.Request.Url.LocalPath.TrimStart('/'));if(Test-Path $p -PathType Container){$d=Get-ChildItem $p|%{\"<a href='/$($_.FullName.Substring($root.Length).TrimStart('\\').Replace('\\','/'))'>$_</a><br>\"};$b=[Text.Encoding]::UTF8.GetBytes($d)}elseif(Test-Path $p -PathType Leaf){$b=[IO.File]::ReadAllBytes($p)}else{$b=[Text.Encoding]::UTF8.GetBytes(\"404\")};$c.Response.OutputStream.Write($b,0,$b.Length);$c.Response.Close()}"
        ],
        "web clients": [
            "curl -s http://#IP:#PORT/file.txt -o file.txt",
            "wget http://#IP:#PORT/file.txt -O file.txt",
            "powershell -c \"Invoke-WebRequest -Uri 'http://#IP:#PORT/file.txt' -OutFile 'file.txt'\"",
            "powershell -c \"Invoke-RestMethod -Uri 'http://#IP:#PORT/file.txt' -OutFile 'file.txt'\"",
            "powershell -c \"(New-Object System.Net.WebClient).DownloadFile('http://#IP:#PORT/file.txt', 'file.txt')\"",
            "certutil -urlcache -split -f \"http://#IP:#PORT/file.txt\" file.txt",
            "bitsadmin /transfer #JobName /download /priority normal http://#IP:#PORT/file.txt C:\\Path\\To\\Destination\\file.txt",
            "python -c 'import urllib.request;url = \"http://#IP:#PORT/file.txt\";urllib.request.urlretrieve(url, \"file.txt\")'"
        ],
        "smb servers": [
            "net share #ShareName=C:\\Path\\To\\Folder",
            "net share #ShareName=C:\\Path\\To\\Folder /grant:Everyone,FULL",
            "# impacket's smbserver.py \npython smbserver.py #ShareName C:\\Path\\To\\Folder",
            "python -m pip install impacket\npython -m impacket.smbserver #ShareName C:\\Path\\To\\Folder"
        ],
        "smb clients": [
            "net use #DriveLetter: \\\\\\\\#IP\\\\#Share /user:#USERNAME #PASSWORD",
            "net use Z: \\\\\\\\#IP\\\\#Share /user:#USERNAME #PASSWORD",
            "copy \\\\\\\\#IP\\\\#Share\\\\file.txt C:\\\\Path\\\\To\\\\Destination\\\\file.txt",
            "net use Z: \\\\#IP\\#Share",
            "net use Z: \\\\#IP\\#Share /user:#USERNAME #PASSWORD",
            "net use Z: /delete",
            "Copy-Item \\\\#IP\\#Share\\file.txt C:\\Path\\To\\Destination\\file.txt",
            "Copy-Item C:\\Path\\To\\file.txt \\\\#IP\\#Share\\file.txt",
            "$cred = Get-Credential\nCopy-Item \\\\#IP\\#Share\\file.txt C:\\Path\\To\\Destination\\file.txt -Credential $cred",
            "robocopy C:\\Path\\To\\Folder \\\\#IP\\#Share /E",
            "robocopy \\\\#IP\\#Share C:\\Path\\To\\Destination\\Folder /E"
        ],
        "ftp servers": [
            "python -m pyftpdlib -p #PORT",
            "dism /online /enable-feature /featurename:IIS-FTPServer /all\nnet start ftpsvc"
        ],
        "ftp clients": [
            "ftp #IP",
            "ftp\nopen #IP #PORT",
            "wget ftp://#IP/file.txt",
            "wget ftp://#USERNAME:#PASSWORD@#IP/file.txt",
            "wget ftp://#USERNAME:#PASSWORD@#IP:#PORT/file.txt",
            "curl ftp://#USERNAME:#PASSWORD@#IP/file.txt -o file.txt",
            "curl -T file.txt ftp://#IP/",
            "lftp #IP",
            "lftp -u #USERNAME,#PASSWORD #IP",
            "lftp\nopen ftp://#USERNAME:#PASSWORD@#IP:#PORT",            
        ],
        "scp": [
            "scp -P 2222 C:\\Path\\To\\file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "scp C:\\Path\\To\\file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "scp #USERNAME@#IP:/Remote/Path/To/file.txt C:\\Path\\To\\Destination\\file.txt",
            "scp -r C:\\Path\\To\\Folder #USERNAME@#IP:/Path/To/Destination/Folder",
            "scp -r #USERNAME@#IP:/Remote/Path/To/Folder C:\\Path\\To\\Destination\\Folder"
        ],
        "pscp": [
            "pscp.exe C:\\Path\\To\\file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "pscp.exe #USERNAME@#IP::/Remote/Path/To/file.txt C:\\Path\\To\\Destination\\file.txt",
            "pscp.exe -P #PORT C:\\Path\\To\\file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "pscp.exe -r C:\\Path\\To\\Folder #USERNAME@#IP:/Path/To/Destination/Folder"
        ],
        "nc ( server )": [
            "nc.exe -lvnp #PORT < file.txt",
            "nc.exe -lvnp #PORT > file.txt",
            "ncat.exe --ssl -lvnp #PORT < file.txt",
            "ncat.exe --ssl -lvnp #PORT > file.txt"
        ],
        "nc ( client )": [
            "nc.exe #IP #PORT > file.txt",
            "nc.exe #IP #PORT < file.txt",
            "ncat.exe --ssl #IP #PORT > file.txt",
            "ncat.exe --ssl #IP #PORT < file.txt"
        ],
        "socat ( server )": [
            "socat TCP-LISTEN:#PORT,fork FILE:file.txt,creat",
            "socat -u FILE:file.txt TCP-LISTEN:#PORT"
        ],
        "socat ( client )": [
            "socat FILE:file.txt TCP:#IP:#PORT",
            "socat -u TCP:#IP:#PORT FILE:file.txt,create"
        ],
        "openssl": [
            "#Generate a self-signed cert (do this once on the server side)\nopenssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365",
            "openssl s_server -quiet -accept #PORT -key key.pem -cert cert.pem > file.txt",
            "openssl s_client -quiet -connect #IP:#PORT < file.txt"
        ],
        "hex encoding": [
            "$bytes = [System.IO.File]::ReadAllBytes('file.txt')\n$hex = ($bytes | ForEach-Object { $_.ToString(\"X2\") }) -join \"\"\nSet-Content -Path 'hexfile.txt' -Value $hex",
            "certutil -encodehex \"C:\\Path\\To\\file.txt\" \"C:\\Path\\To\\hexfile.txt\" 0"
        ],
        "hex decoding": [
            "(Get-Content hexfile.txt) -join '' -split '(.{2})' | ? {$_} | % {[Convert]::ToByte($_,16)} | Set-Content -Encoding Byte file.txt",
            "certutil -decodehex \"C:\\Path\\To\\hexfile.txt\" \"C:\\Path\\To\\file.txt\""
        ],
        "base64 encoding": [
            "certutil -encode \"C:\\Path\\To\\file.txt\" \"C:\\Path\\To\\b64encodedfile.txt\"",
            "[Convert]::ToBase64String((Get-Content file.txt -Encoding byte)) > b64encodedfile.txt"
        ],
        "base64 decoding": [
            "certutil -decode \"C:\\Path\\To\\b64encodedfile.txt\" \"C:\\Path\\To\\file.txt\"",
            "[IO.File]::WriteAllBytes(\"$PWD/file.txt\",[Convert]::FromBase64String((Get-Content b64encodedfile.txt)))"
        ]
    },
    "linux": {
        "web servers": [
            "python3 -m http.server #PORT",
            "php -S 0.0.0.0:#PORT",
            "ruby -run -e httpd . -p #PORT",
            "busybox httpd -f -p #PORT",
            "perl -MHTTP::Server::Simple -e 'HTTP::Server::Simple->new->run'",
            "python2 -m SimpleHTTPServer #PORT",
            "npx http-server /Path/To/Folder -p #PORT"
        ],
        "web clients": [
            "wget http://#IP:#PORT/file.txt",
            "wget -O file.txt http://#IP:#PORT/file.txt",
            "wget --no-check-certificate https://#IP:#PORT/file.txt",
            "curl http://#IP:#PORT/file.txt -o file.txt",
            "curl -O http://#IP:#PORT/file.txt",
            "axel http://#IP:#PORT/file.txt",
            "axel -n <number_of_connections> http://#IP:#PORT/file.txt",
            "curl -k https://#IP:#PORT/file.txt -o file.txt",
            "python3 -c \"import urllib.request; urllib.request.urlretrieve('http://#IP:#PORT/file.txt','file.txt')\"",
            "perl -e \"use LWP::Simple; getstore('http://#IP:#PORT/file.txt','file.txt');\"",
            "php -r \"file_put_contents('file.txt', file_get_contents('http://#IP:#PORT/file.txt'));\""
        ],
        "smb servers": [
            "impacket-smbserver #ShareName /Path/To/Share -smb2support",
            "impacket-smbserver #ShareName /Path/To/Share",
            "impacket-smbserver #ShareName /Path/To/Share -user #USERNAME -password #PASSWORD"
        ],
        "smb clients": [
            "smbclient //#IP/#Share -U #USERNAME",
            "smbclient //#IP/#Share -N",
            "impacket-smbclient #USERNAME:#PASSWORD@#IP"
        ],
        "ftp servers": [
            "python3 -m pyftpdlib -p #PORT",
            "sudo apt install vsftpd -y\nsudo systemctl start vsftpd",
            "sudo apt install pure-ftpd -y\nsudo pure-ftpd -p #PORT -B",
            "busybox ftpd -w -p #PORT /Path/To/Share"
        ],
        "ftp clients": [
            "ftp #IP #PORT",
            "wget ftp://#USERNAME:#PASSWORD@#IP:#PORT/file.txt",
            "curl ftp://#USERNAME:#PASSWORD@#IP:#PORT/file.txt -o file.txt",
            "lftp -p #PORT #IP",
            "curl -T file.txt ftp://#IP:#PORT/",
            "sftp -P #PORT #USERNAME@#IP"
        ],
        "scp": [
            "scp -P 2222 /Path/To/file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "scp /Path/To/file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "scp #USERNAME@#IP:/Remote/Path/To/file.txt /Path/To/Destination/file.txt",
            "scp -r /Path/To/Folder #USERNAME@#IP:/Path/To/Destination/Folder",
            "scp -r #USERNAME@#IP:/Remote/Path/To/Folder /Path/To/Destination/Folder"
        ],
        "rsync": [
            "rsync -chavzP --stats #USERNAME@#IP:/Remote/Path/To/file.txt /Path/To/Destination/file.txt",
            "rsync -avz -e \"ssh -p #PORT\" file.txt #USERNAME@#IP:/Path/To/Destination/file.txt",
            "rsync -avz -e \"ssh -p #PORT\" #USERNAME@#IP:/Remote/Path/To/file.txt /Path/To/Destination/file.txt",
            "rsync -avz -e \"ssh -p #PORT\" /Path/To/Folder #USERNAME@#IP:/Path/To/Destination/Folder",
            "rsync -avz -e \"ssh -p #PORT\" #USERNAME@#IP:/Remote/Path/To/Folder /Path/To/Destination/Folder"
        ],
        "nc ( server )": [
            "nc -lvnp #PORT < file.txt",
            "nc -lvnp #PORT > file.txt",
            "ncat --ssl -lvnp #PORT < file.txt"
        ],
        "nc ( client )": [
            "nc #IP #PORT > file.txt",
            "nc #IP #PORT < file.txt",
            "ncat --ssl #IP #PORT > file.txt"
        ],
        "socat ( server )": [
            "socat TCP-LISTEN:#PORT,fork file:file.txt",
            "socat -u FILE:file.txt TCP-LISTEN:#PORT"
        ],
        "socat ( client )": [
            "socat TCP:#IP:#PORT file:file.txt,create",
            "socat -u TCP:#IP:#PORT FILE:file.txt,create"
        ],
        "openssl": [
            "#Generate a self-signed cert (do this once on the server side)\nopenssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365",
            "openssl s_server -quiet -accept #PORT -key key.pem -cert cert.pem > file.txt",
            "openssl s_client -quiet -connect #IP:#PORT < file.txt"
        ],
        "nfs servers": [
            "sudo apt install unfs3 -y\necho \"/Path/To/Share *(rw,no_root_squash)\" | sudo tee /etc/exports\nsudo unfsd -e /etc/exports -n"
        ],
        "nfs clients": [
            "sudo mount -t nfs #IP:/#Share /mnt/nfs"
        ],
        "/dev/tcp ( download/upload )": [
            "echo 'exec 3<>/dev/tcp/#IP/#PORT; cat <&3 > file.txt' | bash",
            "echo 'exec 3<>/dev/tcp/#IP/#PORT; cat file.txt >&3' | bash"
        ],
        "xxd ( encoding/decoding )": [
            "xxd -p file.txt > hexfile.txt",
            "xxd -p -r hexfile.txt > file.txt"
        ],
        "base64 ( encoding/decoding )": [
            "base64 file.txt > b64encodedfile.txt",
            "base64 -d b64encodedfile.txt > file.txt"
        ]
    }
};
