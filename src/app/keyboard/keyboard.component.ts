'use strict';

import {Component} from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.component.html',
  styleUrls: ['keyboard.component.css']
})
export class KeyboardComponent {
  public layout = [
    {
      keys: [
        'ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'
      ]
    },
    {
      keys: [
        'α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'
      ]
    },
    {
      keys: [
        'ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ'
      ]
    }
  ];
  text: String = '';

  constructor(public dialogRef: MdDialogRef<KeyboardComponent>) {

  }

  addLetter(key) {
    this.text += key;
  }

  addSpace() {
    this.text += ' ';
  }

  removeLetter() {
    this.text = this.text.slice(0, -1);
  }

  close() {
    this.dialogRef.close(this.text);
  }
}
