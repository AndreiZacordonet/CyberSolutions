import socket
# import imageio as iio

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))

# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
    print('#########################################################################')
    print('Serverul asculta potentiali clienti.')
    # asteapta conectarea unui client la server
    # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
    clientsocket, address = serversocket.accept()
    print('S-a conectat un client.')
    # se proceseaza cererea si se citeste prima linie de text
    cerere = ''
    linieDeStart = ''
    resource = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        if not cerere:
            print(f'Cerere {cerere} goala')
            clientsocket.close()
            break
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if pozitie > -1:
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + '#####')
            resource = linieDeStart.split(' ')[1]
            resource = 'continut' + resource
            print(resource + ", type: " + str(type(resource)))
            break
    
    if not resource:
        continue
    
    response = bytes()
    tip = resource.split('.')[-1]
    match tip:
        case 'ico':
            tip = "image/x-icon"
        case 'png':
            tip = 'image/png'
        case 'jpeg' | 'jpg':
            tip = 'image/jpeg'
        case 'css':
            tip = "text/css"
        case 'html':
            tip = 'text/html'
        case 'js':
            tip = 'application/javascript'
        case 'xml':
            tip = 'text/xml'
        case _:
            tip = 'text/plain'

    try:
        print('calea: ' + resource)
        f = open(resource, 'rb')
        # citim fisierul
        file_content = f.read()
        f.close()
        response = 'HTTP/1.1 200 OK\r\n'.encode()
        response += f'Content-Length: {str(len(file_content))}\r\n'.encode()
        response += f'Content-Type: {tip}\r\n'.encode()
        response += f'Server: localhost\r\n\r\n'.encode()
        response += file_content
    except FileNotFoundError:
        print('Fisierul nu a fost gasit')
        response = ('HTTP/1.1 404 Not Found\r\n').encode()
    finally:
        print(response)
        clientsocket.sendall(response)
        clientsocket.close()

print('S-a terminat cititrea.')
# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
# TODO trimiterea răspunsului HTTP
clientsocket.close()
print('S-a terminat comunicarea cu clientul.')