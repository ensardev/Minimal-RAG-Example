# 🧠 Minimal RAG-API Example

> **Retrieval-Augmented Generation (RAG) API ile Belge Analizi**

Bu proje, temel bir Retrieval-Augmented Generation (RAG) pipeline'ının Node.js ve açık kaynak araçlarla nasıl kurulabileceğini öğrenmek ve denemek için yapıldı. Gerçek hayat için production seviyesinde değildir, sadece öğrenme ve pratik amaçlıdır.

---

## 🎯 Proje Amacı

- 📄 Dosya yükleme → chunk'lama → embedding → vektör veritabanı → QA endpoint zincirini pratik etmek
- 🔧 Ollama, Qdrant ve Deepseek API'yi tanımak ve entegre etmek
- 🧠 Modern RAG sisteminin temel yapısını öğrenmek

## 📚 Öğrendiklerimiz

- **Metin İşleme**: Belgelerin anlamlı chunk'lara bölünmesi
- **Ollama**: Yerel embedding modeli ile vektör oluşturma
- **Qdrant**: Vektör veritabanı ile semantik arama
- **Deepseek API**: OpenAI uyumlu LLM entegrasyonu

## ✨ Temel Özellikler

### 📁 Dosya Yönetimi
- PDF, DOCX ve TXT dosya desteği
- Otomatik parse ve chunk işlemi
- Metin çıkarma ve temizleme

### 🔍 Akıllı Arama
- Vektör tabanlı semantik arama
- TopK ile en yakın context bulma
- Hızlı ve doğru sonuçlar

### 🤖 AI Entegrasyonu
- Deepseek API ile gelişmiş yanıtlar
- Context-aware cevap üretimi
- OpenAI uyumlu interface

---

## 🛠️ Kurulum

### 1️⃣ Projeyi İndirin
```bash
git clone https://github.com/ensardev/Minimal-RAG-Example.git
cd rag-api
```

### 2️⃣ Bağımlılıkları Yükleyin
```bash
npm install
```

### 3️⃣ Ortam Değişkenlerini Ayarlayın
`.env` dosyasını oluşturun:
```env
PORT=3000
QDRANT_URL=http://localhost:6333
OLLAMA_URL=http://localhost:11434
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 4️⃣ Servisleri Başlatın
```bash
# Ollama servisini başlatın (nomic-embed-text modeli gerekli)
ollama serve

# Qdrant'ı Docker ile çalıştırın
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

### 5️⃣ Uygulamayı Çalıştırın
```bash
npx ts-node src/app.ts
```

---

## 📁 Proje Mimarisi

```
src/
├── routes/
│   ├── upload.ts             # Dosya yükleme endpoint
│   └── rag.ts                # Soru-cevap endpoint
├── controllers/
│   ├── uploadController.ts   # Upload iş mantığı
│   └── ragController.ts      # RAG iş mantığı
├── services/
│   ├── fileService.ts        # Dosya işleme ve chunking
│   ├── embeddingService.ts   # Ollama embedding
│   ├── vectorDbService.ts    # Qdrant işlemleri
│   └── deepseekService.ts    # Deepseek API çağrıları
├── utils/
│   ├── chunkText.ts         # Metin parçalama
│   └── parseFile.ts         # Dosya parsing
└── app.ts                   # Ana uygulama
```

---

## 🌐 API Kullanımı

### 📤 Dosya Yükleme Endpoint
**POST** `/upload`

Desteklenen formatlar: PDF, DOCX, TXT

```bash
curl -X POST http://localhost:3000/upload \
  -F "file=@your-document.pdf"
```

**Otomatik İşlemler:**
- Dosya parse edilir
- Metin chunk'lara bölünür
- Embedding oluşturulur
- Qdrant'a kaydedilir

### 🤖 Soru-Cevap Endpoint (RAG)
**POST** `/rag/ask`

```bash
curl -X POST http://localhost:3000/rag/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Belgedeki ana konular nelerdir?"}'
```

**Request Body:**
```json
{
  "question": "Sorunuz buraya gelecek"
}
```

**İşlem Akışı:**
1. Soru embedding'e dönüştürülür
2. Qdrant'ta en yakın chunk'lar bulunur
3. Context olarak Deepseek'e gönderilir
4. AI-powered yanıt üretilir

---

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler
- **Backend**: Node.js + Express.js + TypeScript
- **Embedding Model**: `nomic-embed-text` (Ollama)
- **Vector Database**: Qdrant
- **LLM**: Deepseek API (OpenAI uyumlu)

### Veri Akışı
```
📄 Dosya → ✂️ Chunk → 🔗 Embedding → 🗄️ Qdrant
❓ Soru → 🔍 Arama → 🗄️ Qdrant → 🤖 LLM → 💬 Cevap
```

---

## ⚠️ Önemli Notlar

> Bu proje öğrenme amaçlıdır.

**Gereksinimler:**
- Node.js 18+
- Docker (Qdrant için)
- Ollama kurulumu ve `nomic-embed-text` modeli
- Deepseek API anahtarı
