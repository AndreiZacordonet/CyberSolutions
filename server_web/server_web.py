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
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if pozitie > -1:
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + '#####')
            resource = linieDeStart.split(' ')[1]
            if resource == 'favicon.ico':
                # is image
                pass
            resource = 'continut' + resource
            print(resource + ", type: " + str(type(resource)))
            break
    # clientsocket.sendall("<html><h1>Hhihihiaaa</h1></html>\r\n".encode())
    response = ''
    try:
        print('calea: ' + resource)
        f = open(resource, 'r', encoding='utf-8')
        response = 'HTTP/1.1 200 OK' + '\r\n'
        # citim fisierul
        file_content = f.read()
        response += str(len(file_content)) + '\r\nhtml\r\n' + 'server_web' + '\r\n'
        response += file_content + '\r\n'
    except FileNotFoundError:
        print('Fisierul nu a fost gasit')
        response = 'HTTP/1.1 404 Not Found' + '\r\n'
    finally:
        print(response)
        clientsocket.sendall(response.encode())
        clientsocket.close()
    # clientsocket.sendall(open(resource, 'rb').read() + '\r\n'.encode())
    # clientsocket.sendall('\r\n'.encode())
    # clientsocket.close()
print('S-a terminat cititrea.')
# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
# TODO trimiterea răspunsului HTTP
clientsocket.close()
print('S-a terminat comunicarea cu clientul.')