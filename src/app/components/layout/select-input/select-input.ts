import {Component, computed, input, linkedSignal, output, PipeTransform, signal} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption
  ],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInput {
  readonly label = input<string>('Select');
  readonly options = input<string[]>([]);
  readonly initialOption = input<string>();
  readonly currentOption = linkedSignal(()=> this.initialOption() ?? this.options()[0]);
  readonly usePipe = input<PipeTransform>()
  isOpen = signal(false);
  optionsToDisplay = computed(() => {
    return this.options().map(option => this.usePipe() ? this.usePipe()!.transform(option) : option);
  })

  selectedOption = output<string>();
  protected chooseOption(option: string) {
   this.currentOption.set(option);
   this.selectedOption.emit(option);
   this.isOpen.set(false);
  }
}
