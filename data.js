var DefaultData = {
    "windows": {
        "web servers": [
            "python -m http.server #PORT",
            "python2 -m SimpleHTTPServer #PORT",
            "iisexpress /path:C:#PATHTOSHARE /port:#PORT",
            "php -S 0.0.0.0:#PORT",
            "$root=(Get-Location).Path;$h=New-Object Net.HttpListener;$h.Prefixes.Add(\"http://+:#PORT/\");$h.Start();while($h.IsListening){$c=$h.GetContext();$p=Join-Path $root ($c.Request.Url.LocalPath.TrimStart('/'));if(Test-Path $p -PathType Container){$d=Get-ChildItem $p|%{\"<a href='/$($_.FullName.Substring($root.Length).TrimStart('\\').Replace('\\','/'))'>$_</a><br>\"};$b=[Text.Encoding]::UTF8.GetBytes($d)}elseif(Test-Path $p -PathType Leaf){$b=[IO.File]::ReadAllBytes($p)}else{$b=[Text.Encoding]::UTF8.GetBytes(\"404\")};$c.Response.OutputStream.Write($b,0,$b.Length);$c.Response.Close()}"
        ],
        "web clients": [
            "curl -s http://#IP:#PORT/#FILE -o #FILE",
            "wget http://#IP:#PORT/#FILE -O #FILE",
            "powershell -c \"Invoke-WebRequest -Uri 'http://#IP:#PORT/#FILE' -OutFile '#FILE'\"",
            "powershell -c \"Invoke-RestMethod -Uri 'http://#IP:#PORT/#FILE' -OutFile '#FILE'\"",
            "powershell -c \"(New-Object System.Net.WebClient).DownloadFile('http://#IP:#PORT/#FILE', '#FILE')\"",
            "certutil -urlcache -split -f \"http://#IP:#PORT/#FILE\" #FILE",
            "bitsadmin /transfer #JOBNAME /download /priority normal http://#IP:#PORT/#FILE C:#PATHTODEST\\#FILE",
            "python -c 'import urllib.request;url = \"http://#IP:#PORT/#FILE\";urllib.request.urlretrieve(url, \"#FILE\")'"
        ],
        "smb servers": [
            "net share #SHARENAME=C:#PATHTOSHARE",
            "net share #SHARENAME=C:#PATHTOSHARE /grant:Everyone,FULL",
            "# impacket's smbserver.py \npython smbserver.py #SHARENAME C:#PATHTOSHARE",
            "python -m pip install impacket\npython -m impacket.smbserver #SHARENAME C:#PATHTOSHARE"
        ],
        "smb clients": [
            "net use #DRIVELETTER: \\\\\\\\#IP\\\\#SHARENAME /user:#USERNAME #PASSWORD",
            "net use Z: \\\\\\\\#IP\\\\#SHARENAME /user:#USERNAME #PASSWORD",
            "copy \\\\\\\\#IP\\\\#SHARENAME\\\\#FILE C:#PATHTODEST\\#FILE",
            "net use Z: \\\\#IP\\#SHARENAME",
            "net use Z: \\\\#IP\\#SHARENAME /user:#USERNAME #PASSWORD",
            "net use Z: /delete",
            "Copy-Item \\\\#IP\\#SHARENAME\\#FILE C:#PATHTODEST\\#FILE",
            "Copy-Item C:#PATHTOSHARE\\#FILE \\\\#IP\\#SHARENAME\\#FILE",
            "$cred = Get-Credential\nCopy-Item \\\\#IP\\#SHARENAME\\#FILE C:#PATHTODEST\\#FILE -Credential $cred",
            "robocopy C:#PATHTOSHARE \\\\#IP\\#SHARENAME /E",
            "robocopy \\\\#IP\\#SHARENAME C:#PATHTODEST /E"
        ],
        "ftp servers": [
            "python -m pyftpdlib -p #PORT",
            "dism /online /enable-feature /featurename:IIS-FTPServer /all\nnet start ftpsvc"
        ],
        "ftp clients": [
            "ftp #IP",
            "ftp\nopen #IP #PORT",
            "wget ftp://#IP/#FILE",
            "wget ftp://#USERNAME:#PASSWORD@#IP/#FILE",
            "wget ftp://#USERNAME:#PASSWORD@#IP:#PORT/#FILE",
            "curl ftp://#USERNAME:#PASSWORD@#IP/#FILE -o #FILE",
            "curl -T #FILE ftp://#IP/",
            "lftp #IP",
            "lftp -u #USERNAME,#PASSWORD #IP",
            "lftp\nopen ftp://#USERNAME:#PASSWORD@#IP:#PORT",            
        ],
        "scp": [
            "scp -P #PORT C:#PATHTOSHARE\\#FILE #USERNAME@#IP:#PATHTODEST\\#FILE",
            "scp C:#PATHTOSHARE\\#FILE #USERNAME@#IP:#PATHTODEST\\#FILE",
            "scp #USERNAME@#IP:#PATHTOSHARE\\#FILE C:#PATHTODEST\\#FILE",
            "scp -r C:#PATHTOSHARE #USERNAME@#IP:#PATHTODEST",
            "scp -r #USERNAME@#IP:#PATHTOSHARE C:#PATHTODEST"
        ],
        "pscp": [
            "pscp.exe C:#PATHTOSHARE\\#FILE #USERNAME@#IP:#PATHTODEST\\#FILE",
            "pscp.exe #USERNAME@#IP::#PATHTOSHARE\\#FILE C:#PATHTODEST\\#FILE",
            "pscp.exe -P #PORT C:#PATHTOSHARE\\#FILE #USERNAME@#IP:#PATHTODEST\\#FILE",
            "pscp.exe -r C:#PATHTOSHARE #USERNAME@#IP:#PATHTODEST"
        ],
        "nc ( server )": [
            "nc.exe -lvnp #PORT < #FILE",
            "nc.exe -lvnp #PORT > #FILE",
            "ncat.exe --ssl -lvnp #PORT < #FILE",
            "ncat.exe --ssl -lvnp #PORT > #FILE"
        ],
        "nc ( client )": [
            "nc.exe #IP #PORT > #FILE",
            "nc.exe #IP #PORT < #FILE",
            "ncat.exe --ssl #IP #PORT > #FILE",
            "ncat.exe --ssl #IP #PORT < #FILE"
        ],
        "socat ( server )": [
            "socat TCP-LISTEN:#PORT,fork FILE:#FILE,creat",
            "socat -u FILE:#FILE TCP-LISTEN:#PORT"
        ],
        "socat ( client )": [
            "socat FILE:#FILE TCP:#IP:#PORT",
            "socat -u TCP:#IP:#PORT FILE:#FILE,create"
        ],
        "openssl": [
            "#Generate a self-signed cert (do this once on the server side)\nopenssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365",
            "openssl s_server -quiet -accept #PORT -key key.pem -cert cert.pem > #FILE",
            "openssl s_client -quiet -connect #IP:#PORT < #FILE"
        ],
        "hex encoding": [
            "$bytes = [System.IO.File]::ReadAllBytes('#FILE')\n$hex = ($bytes | ForEach-Object { $_.ToString(\"X2\") }) -join \"\"\nSet-Content -Path 'hexfile.txt' -Value $hex",
            "certutil -encodehex \"C:#PATHTOSHARE\\#FILE\" \"C:#PATHTOSHARE\\hexfile.txt\" 0"
        ],
        "hex decoding": [
            "(Get-Content hexfile.txt) -join '' -split '(.{2})' | ? {$_} | % {[Convert]::ToByte($_,16)} | Set-Content -Encoding Byte #FILE",
            "certutil -decodehex \"C:#PATHTOSHARE\\hexfile.txt\" \"C:#PATHTOSHARE\\#FILE\""
        ],
        "base64 encoding": [
            "certutil -encode \"C:#PATHTOSHARE\\#FILE\" \"C:#PATHTOSHARE\\b64encodedfile.txt\"",
            "[Convert]::ToBase64String((Get-Content #FILE -Encoding byte)) > b64encodedfile.txt"
        ],
        "base64 decoding": [
            "certutil -decode \"C:#PATHTOSHARE\\b64encodedfile.txt\" \"C:#PATHTODEST\\#FILE\"",
            "[IO.File]::WriteAllBytes(\"$PWD/#FILE\",[Convert]::FromBase64String((Get-Content b64encodedfile.txt)))"
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
            "npx http-server #PATHTOSHARE -p #PORT"
        ],
        "web clients": [
            "wget http://#IP:#PORT/#FILE",
            "wget -O #FILE http://#IP:#PORT/#FILE",
            "wget --no-check-certificate https://#IP:#PORT/#FILE",
            "curl http://#IP:#PORT/#FILE -o #FILE",
            "curl -O http://#IP:#PORT/#FILE",
            "axel http://#IP:#PORT/#FILE",
            "axel -n <number_of_connections> http://#IP:#PORT/#FILE",
            "curl -k https://#IP:#PORT/#FILE -o #FILE",
            "python3 -c \"import urllib.request; urllib.request.urlretrieve('http://#IP:#PORT/#FILE','#FILE')\"",
            "perl -e \"use LWP::Simple; getstore('http://#IP:#PORT/#FILE','#FILE');\"",
            "php -r \"file_put_contents('#FILE', file_get_contents('http://#IP:#PORT/#FILE'));\""
        ],
        "smb servers": [
            "impacket-smbserver #SHARENAME #PATHTOSHARE -smb2support",
            "impacket-smbserver #SHARENAME #PATHTOSHARE",
            "impacket-smbserver #SHARENAME #PATHTOSHARE -user #USERNAME -password #PASSWORD"
        ],
        "smb clients": [
            "smbclient //#IP/#SHARENAME -U #USERNAME",
            "smbclient //#IP/#SHARENAME -N",
            "impacket-smbclient #USERNAME:#PASSWORD@#IP"
        ],
        "ftp servers": [
            "python3 -m pyftpdlib -p #PORT",
            "sudo apt install vsftpd -y\nsudo systemctl start vsftpd",
            "sudo apt install pure-ftpd -y\nsudo pure-ftpd -p #PORT -B",
            "busybox ftpd -w -p #PORT #PATHTOSHARE"
        ],
        "ftp clients": [
            "ftp #IP #PORT",
            "wget ftp://#USERNAME:#PASSWORD@#IP:#PORT/#FILE",
            "curl ftp://#USERNAME:#PASSWORD@#IP:#PORT/#FILE -o #FILE",
            "lftp -p #PORT #IP",
            "curl -T #FILE ftp://#IP:#PORT/",
            "sftp -P #PORT #USERNAME@#IP"
        ],
        "scp": [
            "scp -P #PORT #PATHTOSHARE/#FILE #USERNAME@#IP:#PATHTODEST/#FILE",
            "scp #PATHTOSHARE/#FILE #USERNAME@#IP:#PATHTODEST/#FILE",
            "scp #USERNAME@#IP:#PATHTOSHARE/#FILE #PATHTODEST/#FILE",
            "scp -r #PATHTOSHARE #USERNAME@#IP:#PATHTODEST",
            "scp -r #USERNAME@#IP:#PATHTOSHARE #PATHTODEST"
        ],
        "rsync": [
            "rsync -chavzP --stats #USERNAME@#IP:#PATHTOSHARE/#FILE #PATHTODEST/#FILE",
            "rsync -avz -e \"ssh -p #PORT\" #FILE #USERNAME@#IP:#PATHTODEST/#FILE",
            "rsync -avz -e \"ssh -p #PORT\" #USERNAME@#IP:#PATHTOSHARE/#FILE #PATHTODEST/#FILE",
            "rsync -avz -e \"ssh -p #PORT\" #PATHTOSHARE #USERNAME@#IP:#PATHTODEST",
            "rsync -avz -e \"ssh -p #PORT\" #USERNAME@#IP:#PATHTOSHARE #PATHTODEST"
        ],
        "nc ( server )": [
            "nc -lvnp #PORT < #FILE",
            "nc -lvnp #PORT > #FILE",
            "ncat --ssl -lvnp #PORT < #FILE"
        ],
        "nc ( client )": [
            "nc #IP #PORT > #FILE",
            "nc #IP #PORT < #FILE",
            "ncat --ssl #IP #PORT > #FILE"
        ],
        "socat ( server )": [
            "socat TCP-LISTEN:#PORT,fork file:#FILE",
            "socat -u FILE:#FILE TCP-LISTEN:#PORT"
        ],
        "socat ( client )": [
            "socat TCP:#IP:#PORT file:#FILE,create",
            "socat -u TCP:#IP:#PORT FILE:#FILE,create"
        ],
        "openssl": [
            "#Generate a self-signed cert (do this once on the server side)\nopenssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365",
            "openssl s_server -quiet -accept #PORT -key key.pem -cert cert.pem > #FILE",
            "openssl s_client -quiet -connect #IP:#PORT < #FILE"
        ],
        "nfs servers": [
            "sudo apt install unfs3 -y\necho \"#PATHTOSHARE *(rw,no_root_squash)\" | sudo tee /etc/exports\nsudo unfsd -e /etc/exports -n"
        ],
        "nfs clients": [
            "sudo mount -t nfs #IP:/#SHARENAME /mnt/nfs"
        ],
        "/dev/tcp ( download/upload )": [
            "echo 'exec 3<>/dev/tcp/#IP/#PORT; cat <&3 > #FILE' | bash",
            "echo 'exec 3<>/dev/tcp/#IP/#PORT; cat #FILE >&3' | bash"
        ],
        "xxd ( encoding/decoding )": [
            "xxd -p #FILE > hexfile.txt",
            "xxd -p -r hexfile.txt > #FILE"
        ],
        "base64 ( encoding/decoding )": [
            "base64 #FILE > b64encodedfile.txt",
            "base64 -d b64encodedfile.txt > #FILE"
        ]
    }
};
