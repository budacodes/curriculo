import { Location } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MaskApplierService } from 'ngx-mask';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent implements OnInit {
  resume: any = {};

  constructor(
    private location: Location,
    private router: Router,
    private sanitizer: DomSanitizer,
    private mask: MaskApplierService
  ) { }

  ngOnInit(): void {
    this.resume = this.location.getState();

    // if (!this.resume.name) {
    //   this.router.navigate(['generate-resume']);
    // }

    // this._tempMockResume();

    this.resume.customTheme.body = this.sanitizer.bypassSecurityTrustHtml(this.translateHtmlToTheme(this.resume.customTheme.body));
  }

  translateHtmlToTheme(html: string): string {
    console.log(html);

    let newHTML = html
      .replace('[[resume.name]]', this.resume.name)
      .replace('[[resume.desiredRole]]', this.resume.desiredRole)
      .replace('[[resume.postalCode]]', this.mask.applyMask(this.resume.postalCode, '00000-000'))
      .replace('[[resume.address]]', this.resume.address)
      .replace('[[resume.block]]', this.resume.block)
      .replace('[[resume.state]]', this.resume.state)
      .replace('[[resume.city]]', this.resume.city)
      .replace('[[resume.phone]]', this.mask.applyMask(this.resume.phone, '(00) 0000-0000'))
      .replace('[[resume.cellphone]]', this.mask.applyMask(this.resume.cellphone, '(00) 00000-0000'))
      .replace('[[resume.email]]', this.resume.email)
      .replace('[[resume.summary]]', this.resume.summary);

    return newHTML;
  }

  _tempMockResume(): void {
    this.resume = {
      name: 'Marcio F. Câmara Jr.',
      desiredRole: 'Desenvolvedor Front-End',
      postalCode: '13465000',
      address: 'Rua Teste, 123',
      block: 'Vl. Teste',
      state: 'SP',
      city: 'Americana',
      phone: '1934655678',
      cellphone: '19912345678',
      email: 'marciocamarajr@gmail.com',
      summary: 'Desenvolvedor pragmático em desenvolvimento com mais de 7 anos de experiência na área; Profissional certificado Desenvolvedor Angular pela GDE; Profissional certificado Scrum Foundation; Sólidos conhecimentos em padrões de código e Clean Code; Apaixonado por programação e como ela pode mudar o mundo;',
      socialMedias: [
        {
          username: 'camaraxcodes',
          icon: 'linkedin',
          url: 'https://www.linkedin.com/in/camaraxcodes/',
        },
        {
          username: 'camaraxcodes',
          icon: 'instagram',
          url: 'https://www.linkedin.com/in/camaraxcodes/',
        },
      ],
      courses: [{
        name: 'Tecnólogo em Jogos Digitais',
        institution: 'Uninove - Universidade Nove de Julho',
        yearOfConclusion: '2024',
      }],
      jobs: [
        {
          enterprise: 'NAVA - Technology for Business',
          period: [
            new Date(),
            new Date(),
          ],
          role: 'Analista Programador IV | Santander Geração Digital',
          location: 'São Paulo/SP'
        },
        {
          enterprise: 'Followize Softwares',
          period: [
            new Date(),
            new Date(),
          ],
          role: 'Desenvolvedor Front-End Pleno II',
          location: 'Itu/SP'
        },
      ],
      skills: ['Angular', 'SCSS', 'Clean Code'],
      certifications: [{
        name: 'Angular - The Complete Guide',
        institution: 'Udemy',
        yearOfConclusion: '2022',
        yearOfExpiration: '',
      }],
      additionalInformations: [{
        additionalInformation: 'Inglês B1',
      }],
      theme: 999,
      customTheme: {
        body: `
          <div class="resume-container" id="resumeContainer">
            <h1 nz-typography style="margin-bottom: 0;">[[resume.name]]</h1>

            <h3 nz-typography style="margin-top: 0 !important; font-weight: 100; margin-bottom: 2em;">[[resume.desiredRole]]</h3>

            <p>
                <span style="font-weight: bold;">
                    Endereço:
                </span>

                [[resume.address]], [[resume.block]] - [[resume.city]]/[[resume.state]] - [[resume.postalCode]]
            </p>

            <p>
                <span style="font-weight: bold;">
                    Telefones:
                </span>

                [[resume.phone]]/[[resume.cellphone]]
            </p>

            <p>
                <span style="font-weight: bold;">
                    E-mail:
                </span>

                [[resume.email]]
            </p>

            <p *ngIf="resume.summary">
                <span style="font-weight: bold;">
                    Resumo:
                </span>

                [[resume.summary]]
            </p>
          </div>
        `,
      }
    };
  }
}
