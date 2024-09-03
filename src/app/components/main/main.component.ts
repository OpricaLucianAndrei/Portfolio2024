import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  currentSectionIndex = 0;
  sections!: HTMLElement[];

  ngAfterViewInit() {
    this.sections = Array.from(document.querySelectorAll('.section'));
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    console.log('Scroll event detected', event);
    const delta = Math.sign(event.deltaY); // Determina se lo scroll è verso l'alto o il basso

    if (delta > 0) {
      this.scrollToNextSection();
    } else if (delta < 0) {
      this.scrollToPreviousSection();
    }
  }

  scrollToNextSection() {
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  scrollToPreviousSection() {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  scrollToSection(index: number) {
    const section = this.sections[index];
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });

    this.currentSectionIndex = index;
  }
  
}
