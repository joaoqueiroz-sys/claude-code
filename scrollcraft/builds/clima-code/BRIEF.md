# Clima Code: brief

Escrito por mim a partir do pedido. Não houve entrevista: o pedido já trazia a direção e nada foi inventado além disso.

## Pedido do cliente (literal)

> Depois crie o site da Clima Code. Enquanto a pessoa passa o mouse, vai mostrando
> cada um dos serviços. O ar condicionado se abre por partes sendo explicado também.
> E quero que o site seja completamente responsivo, que funcione de acordo com o
> scroll do mouse.

## Os oito tópicos

1. **Vibe:** limpo, técnico, fresco, confiável. Referências: desenho técnico de manual de fábrica, vista explodida de catálogo de peças, luz fria de manhã numa parede branca.
2. **Jornada:** a sala esfria (hero) → o que a gente resolve, explicado sem enrolação → os serviços, um por vez, sob o mouse e o scroll → como o atendimento acontece → o aparelho aberto, peça por peça → os sinais de que é hora de chamar → agendar.
3. **Curva de energia:** calmo no começo, firme nos serviços, tranquilo no processo, o ponto alto na vista explodida, calmo de novo no fim.
4. **Sentimento e momento lembrado:** ver o próprio ar-condicionado se abrir em oito peças, cada uma explicada. Isso é o pico.
5. **O que nenhum site faz:** o aparelho se desmonta no ritmo do scroll, com cada peça explicada no momento em que sai do lugar.
6. **Distância do premium-minimal:** perto, mas com cara de manual técnico, não de agência.
7. **Mundo único ou cenas:** cenas distintas (capítulos).
8. **Assets:** nenhum. Todo o visual é desenhado em SVG e CSS 3D, sem foto gerada. Sem números inventados, sem depoimentos falsos.

## Curva de sentimento

| Ato | Sentimento | O que causa |
|---|---|---|
| 1 Hero | alívio | o termômetro cai de 31° para 22° e a parede passa de quente para fria enquanto a página desce |
| 2 Manifesto | clareza | três frases diretas sobre o que muda com a Clima Code |
| 3 Serviços | controle | cada serviço aparece ao passar o mouse ou ao rolar, com o que está incluído |
| 4 Atendimento | confiança | os quatro passos andam de lado, um de cada vez |
| 5 Por dentro (pico) | fascínio | o aparelho abre em oito peças; cada uma é nomeada e explicada |
| 6 Sinais | reconhecimento | "é exatamente isso que o meu faz"; cada sinal aponta para a peça |
| 7 Agendar | decisão | um formulário curto que abre o WhatsApp com a mensagem pronta |

**Pico:** "É o site em que o ar-condicionado se desmonta inteiro na sua frente e te explica cada peça." Ato 5, maior span da página.

**Frase para contar a alguém:** "É o site em que você entende o seu ar-condicionado antes de chamar o técnico."

## Gramática, movimento-assinatura e partitura

- **Gramática:** editorial em capítulos.
- **Movimento-assinatura:** vista explodida em CSS 3D, dirigida pelo scroll, com inclinação pelo mouse e destaque por hover em cada peça.
- **Partitura:** pin (hero) → flow → pin (serviços) → pan (atendimento) → pin 3D (pico) → flow → pin + magnet (fechamento).

## Pendências do cliente

- Número de WhatsApp real (hoje é um marcador em `site.js`, constante `WHATSAPP`).
- Cidade/região atendida, CNPJ, logotipo oficial, se houver.
