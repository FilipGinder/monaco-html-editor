import * as monaco from 'monaco-editor';
import './index.css';


// Inicijalizacija Monaco Editora
const editor = monaco.editor.create(document.getElementById('editor') as HTMLElement, {
  value: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Filipov HTML Editor</title>\n</head>\n<body>\n  <h1>Testni zadatak za Miadriu</h1>\n</body>\n</html>',
  language: 'html',
  theme: 'vs-dark',
});

//Dugme sacuvaj
document.getElementById('save-button')?.addEventListener('click', () => {
    const editorContent = editor.getValue();  
    const blob = new Blob([editorContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.html';  
    link.click();  
});

//Dugme copy
document.getElementById('copy-button')?.addEventListener('click', () => {
    const editorContent = editor.getValue();  // Uzimamo sadržaj iz editora
  
    // Kopiraj sadržaj u clipboard
    navigator.clipboard.writeText(editorContent).then(() => {    //navigator - globalni objekat u javaScript-u (bukvalno predstavlja otvoreni pregledac-chrome...i ima pristup svim njegovim fcj)
      console.log('Sadržaj je kopiran u clipboard!');
    }).catch(err => {
      console.error('Greška prilikom kopiranja: ', err);
    });
});


//Dugme paste
document.getElementById('paste-button')?.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();  // Čitaj tekst iz clipboard-a
      const position = editor.getPosition();  // Uzmi trenutnu poziciju kursora
  
        if (text) {
            if (position) {
                editor.executeEdits('', [{
                range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                text: text,
                forceMoveMarkers: true                             //pomeranje fokusa
                }]);
            } else {
                console.error('Editor position is null');
            }
        } else {
            alert('Trenutno nemate nista sto bi mogli da nalepite');
            console.error('Clipboard is empty, nothing to paste.');
        }
    } catch (err) {
      console.error('Failed to paste: ', err);
    }
  });


//Dugme za dodavanje slike
document.getElementById('insert-image-button')?.addEventListener('click', () => {
    const imageUrl = 'images/filip.png'; // URL placeholder slike
    const position = editor.getPosition();  // Uzmi trenutnu poziciju kursora
  
    if (position) {
      editor.executeEdits('', [{
        range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        text: `<img src="${imageUrl}" width='80' height='80 alt="Placeholder Image"/>`,
        forceMoveMarkers: true
      }]);

    } else {
      console.error('Editor position is null');
    }
});



document.getElementById('bold-button')?.addEventListener('click', () => {
    formatText('<b>', '</b>');  // Ubaci bold oznake
});

document.getElementById('italic-button')?.addEventListener('click', () => {
    formatText('<i>', '</i>');  // Ubaci italic oznake
});

document.getElementById('underline-button')?.addEventListener('click', () => {
    formatText('<u>', '</u>');  // Ubaci underline oznake
});




function formatText(openTag: string, closeTag: string): void {
    const selection = editor.getSelection();  // Uzimamo selekciju-poziciju-oblast u editoru

    // Proveri da li je selekcija validna
    if (!selection) {
        console.error('No text selected');
        return;
    }

    const model = editor.getModel();  // Uzimamo model
    if (!model) {
        console.error('Editor model is null');
        return;
    }

    const selectedText = model.getValueInRange(selection);  // Uzimamo selektovani tekst iz oblasti - selection

    // Ako je nešto selektovano
    if (selectedText) {
        editor.executeEdits('', [{
            range: selection,
            text: `${openTag}${selectedText}${closeTag}`,  // Ubaci oznake
            forceMoveMarkers: true
        }]);
    } else {
        // Ako ništa nije selektovano, ubaci oznake na kursorsku poziciju
        const position = editor.getPosition();
        if (position) {
            editor.executeEdits('', [{
                range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                text: `${openTag}${closeTag}`,  // Ubaci samo oznake
                forceMoveMarkers: true
            }]);
        } else{
            console.error('Editor position is null'); 
        }
    }
}



  
  
  




