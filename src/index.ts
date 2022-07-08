/**
 * TODOs - Add eslint, add husky pre-commit hook
 */
import { useEffect, useState } from "react"

export const useNfc = () => {

  const [ndef, setNdef] = useState<NDEFReader>()
  const [isNDEFAvailable, setIsNDEFAvailable] = useState<undefined | boolean>()
  const [permission, setPermission] = useState('')

  const [readCtrl, setReadCtrl] = useState(new AbortController())
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const init = async () => {
      if ("NDEFReader" in window) {
        setNdef(new NDEFReader())
        console.log("READER CREATED");

        // NDEF availability
        setIsNDEFAvailable(true)
        
        // permission
        const permissionName = "nfc" as PermissionName;
        const permissionStatus = await navigator.permissions.query({ name: permissionName });

        setPermission(permissionStatus.state)

        permissionStatus.onchange = function () {
          setPermission(this.state)
          console.log("PERMISSION STATUS CHANGED ", permissionStatus);
        };

        // onabort hook 
        readCtrl.signal.onabort = ((e: Event) => {
          console.log("Inside onabort hook!!", e);
          setIsScanning(false)
          setReadCtrl(new AbortController())
          console.log("--- Creating new readCtrl ---");
        })
      } else {
        setIsNDEFAvailable(false)
      }
    }
    init();
  }, [readCtrl.signal])

  const read = async (): Promise<NDEFReadingEvent> => {

    return new Promise(async (resolve, reject) => {

      if (isScanning) {
        reject("Error - Reader already scanning")
      }

      if (permission === 'denied') {
        reject("Error - Missing permissions, NFC devices blocked ")
      }

      if (!isScanning) {

        try {
          await ndef!.scan({ signal: readCtrl.signal })
          setIsScanning(true)
          ndef!.addEventListener("reading", (event) => {

            resolve(event as NDEFReadingEvent);
            setTimeout(() => {
              console.log("Aborting...")
              readCtrl.abort()
            }, 5000);
          }, { once: true, signal: readCtrl.signal });

          ndef!.addEventListener("readingerror", (error) => {

            reject(error);
            setTimeout(() => {
              console.log("Aborting...")
              readCtrl.abort()

            }, 5000);
          }, { once: true, signal: readCtrl.signal });
        } catch (error) {

          console.log(`Error! Scan failed to start: ${error}.`)
          readCtrl.abort()
          reject(error);
        }
      }

      // Could make sense to add an option to the hook to make it Timeout (Pormise Rejected) after a predefined amount of ms!!
      // setTimeout(() => {
      //   console.log("Timeout"!!");
      // }, 15000);

    });
  }

  const write = async (message: NDEFMessageSource, options?: NDEFWriteOptions | undefined) => {
    console.log("INSIDE WRITE FUNCTION");

    return new Promise(async (resolve, reject) => {
      if (!isScanning) {
        try {
          await ndef!.scan({ signal: readCtrl.signal})
          await ndef!.write(message, options);
          resolve(true);
        } catch (error) {
          console.log(error)
          reject(false);
        }
        setIsScanning(true)
      }

    });
  }

  const abortReadCtrl = () => {
    console.log("From abortReadCtrl");
    console.log("readCtrl ", readCtrl);

    readCtrl.abort()
  }

  return {
    isNDEFAvailable: isNDEFAvailable,
    permission,
    read,
    abortReadCtrl,
    write
  }

}
