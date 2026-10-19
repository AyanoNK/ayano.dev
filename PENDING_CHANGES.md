# Pending changes

Drafts of experience changes that were never committed. Each one was drafted twice. This file keeps one consolidated version of each, with the text for all three languages, so the drafts can be applied later.

All three change two files:

- `src/i18n/index/experience.ts`: the translated text.
- `src/sections/ExperienceSection.astro`: the list that decides which text is shown.

A new bullet needs both. A key added to `experience.ts` but not listed in `ExperienceSection.astro` never appears on the site.

## 1. New job: Staff AI Engineer at Meridian Labs

**Status:** placeholder data. The company URL is `https://meridianlabs.example.com`, which is not a real site. Check the company name, URL, dates and figures before applying this.

**Where:** a new `meridian` entry at the top of `index.experience` in `experience.ts`, and a new first item in the `experiences` array in `ExperienceSection.astro`, so it shows above SoftServe.

**Company details** (in `ExperienceSection.astro`):

- `companyName`: `Meridian Labs`
- `companyURL` and project link URL: `https://meridianlabs.example.com`
- `technologies`: `Python`, `LangGraph`, `AWS Textract`, `Docker`

**Text** (in `experience.ts`, under `meridian`):

| Key                      | en                  | es                                         | ja                   |
| :----------------------- | :------------------ | :----------------------------------------- | :------------------- |
| `link_1`                 | Insurance Claims AI | IA para Reclamaciones de Seguros           | 保険金請求AI         |
| `start_date`             | Mar 2026            | Mar 2026                                   | 2026年3月            |
| `end_date`               | Current             | Actual                                     | 現在                 |
| `staff_ai_engineer.role` | Staff AI Engineer   | Ingeniero Staff de Inteligencia Artificial | スタッフAIエンジニア |

`staff_ai_engineer.description`:

- en: Staff AI Engineer at Meridian Labs, working remotely on AI-driven document processing solutions for enterprise clients. I built a document intelligence platform for a large Canadian insurance company that classifies and extracts data from claims documents, using LangGraph agents for orchestration and AWS Textract for OCR.
- es: Ingeniero Staff de Inteligencia Artificial en Meridian Labs, trabajando en remoto en soluciones de procesamiento de documentos impulsadas por IA para clientes empresariales. Construí una plataforma de inteligencia documental para una gran aseguradora canadiense que clasifica y extrae datos de documentos de reclamaciones, utilizando agentes de LangGraph para la orquestación y AWS Textract para el OCR.
- ja: Meridian LabsのスタッフAIエンジニアとして、リモートでエンタープライズ向けのAIドキュメント処理ソリューションに取り組んでいます。カナダの大手保険会社向けに、保険金請求書類の分類とデータ抽出を行うドキュメントインテリジェンスプラットフォームを構築しました。オーケストレーションにはLangGraphエージェント、OCRにはAWS Textractを使用しています。

`staff_ai_engineer.milestone_1`:

- en: Built a document intelligence platform that classifies and extracts data from insurance claims documents, using LangGraph agents for orchestration and AWS Textract for OCR.
- es: Construí una plataforma de inteligencia documental que clasifica y extrae datos de documentos de reclamaciones de seguros, utilizando agentes de LangGraph para la orquestación y AWS Textract para el OCR.
- ja: LangGraphエージェントによるオーケストレーションとAWS TextractによるOCRを活用し、保険金請求書類の分類とデータ抽出を行うドキュメントインテリジェンスプラットフォームを構築しました。

`staff_ai_engineer.milestone_2`:

- en: Reached 85% straight-through processing on claims intake.
- es: Alcancé un 85% de procesamiento automático de extremo a extremo en la recepción de reclamaciones.
- ja: 保険金請求の受付において85%のストレートスルー処理を達成しました。

`staff_ai_engineer.milestone_3`:

- en: Shipped the pilot in 10 weeks.
- es: Entregué el piloto en 10 semanas.
- ja: 10週間でパイロット版をリリースしました。

**The other draft** joined the first two milestones into one bullet ("...reaching 85% straight-through processing on claims intake"), said the pilot was shipped "to the client", and left `link_1` in English for all three languages.

## 2. New SoftServe AI Engineer bullet: MCP server template

**Where:** `softserve.ai_engineer.milestone_4` in `experience.ts`, and add `t("index.experience.softserve.ai_engineer.milestone_4")` after `milestone_3` in the SoftServe AI Engineer `milestones` list in `ExperienceSection.astro`.

- en: Built an internal MCP server template with authentication and authorization included, now used by every team when creating a new MCP server, cutting new server setup time from about a week to one day.
- es: Construí una plantilla interna de servidores MCP con autenticación y autorización incluidas, que ahora usan todos los equipos al crear un nuevo servidor MCP, reduciendo el tiempo de configuración de un nuevo servidor de aproximadamente una semana a un día.
- ja: 認証と認可を組み込んだ社内向けMCPサーバーテンプレートを構築しました。現在は全チームが新しいMCPサーバーの作成時にこのテンプレートを使用しており、新規サーバーのセットアップ時間を約1週間から1日に短縮しました。

**The other draft** said "baked in" instead of "included" and "from a week to a day" instead of "from about a week to one day".

## 3. New Verblio bullet: on-call rotation

**Where:** `verblio.software_engineer.milestone_5` in `experience.ts`, and add `t("index.experience.verblio.software_engineer.milestone_5")` to the Verblio `milestones` list in `ExperienceSection.astro`.

- en: Set up the on-call rotation and wrote the incident runbooks for the platform team.
- es: Configuré la rotación de guardias y escribí los runbooks de incidentes para el equipo de plataforma.
- ja: プラットフォームチームのオンコールローテーションを立ち上げ、インシデント対応のランブックを作成しました。

**The other draft** used "Establecí" in Spanish and "構築し" in Japanese. The English text was the same.

**Note:** `verblio.software_engineer.milestone_4` ("Developed & Implemented new solutions to legacy code...") already exists in `experience.ts` but is not in the `milestones` list, so the site does not show it. Both drafts skipped it and listed only `milestone_5` after `milestone_3`. Decide whether `milestone_4` should be shown too.
