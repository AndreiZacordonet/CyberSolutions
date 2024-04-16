import socket
import gzip
import threading

def clientHandler(clientsocket, _):
    '''
    Receives a socket object and manages clients its requests
    '''
    cerere = ''
    linieDeStart = ''
    resource = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        if not cerere:
            # receive data is empty
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
        # received data is empty
        return      # continue

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
            resource = resource.replace('continut', 'continut/resurse')
        case 'gif':
            tip = 'text/gif'
        case _:
            tip = 'text/plain'

    try:
        print('calea: ' + resource)
        f = open(resource, 'rb')
        # citim fisierul
        file_content = f.read()
        f.close()
        file_content = gzip.compress(file_content)
        response = 'HTTP/1.1 200 OK\r\n'.encode()
        response += f'Content-Length: {str(len(file_content))}\r\n'.encode()
        response += f'Content-Type: {tip}; charset=utf-8\r\n'.encode()
        response += 'Content-Encoding: gzip\r\n'.encode()
        response += 'Server: localhost\r\n\r\n'.encode()
        response += file_content
    except FileNotFoundError:
        print('Fisierul nu a fost gasit')
        response = 'HTTP/1.1 404 Not Found\r\n'.encode()
    finally:
        print(response)
        clientsocket.sendall(response)
        clientsocket.close()

if __name__ == '__main__':
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

        clientThread = threading.Thread(target=clientHandler, args=(clientsocket, '_'))
        clientThread.start()
        