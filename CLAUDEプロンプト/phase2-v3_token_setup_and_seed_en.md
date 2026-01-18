# Phase 2: Sanity API Token Setup and Test Data Entry

## Objective

Add Sanity API Token to environment variables and execute test data seeding script to complete Phase 2.

## Project Information

```
Project Path:
/Users/hayashikenjirou/Rootz Dropbox/林憲二郎/Claude CODE/portfolio/

Sanity Project ID: c1jyl9jh
Dataset: production
```

---

## Step 1: Add API Token to .env.local

Add the following line to `.env.local` file:

```bash
cd "/Users/hayashikenjirou/Rootz Dropbox/林憲二郎/Claude CODE/portfolio"

# Append API token to .env.local
echo 'SANITY_API_TOKEN=skVQy5oq6wv7LLG0wcdFsyLv9x2w1RdwTO988T27q6bJ3dLAQrm8OZ1Mc6efZnyQW3hoSIdprpv2JJ8CMJF8dA4uLnIoM2hiusGPmUzyLr9gl37DkYidK8oHxVGYh5fuNiDge3YU7XjgcymbLBGMu7zAH9rKVGLEU7vahj2EVkBK1WRpd877' >> .env.local
```

After adding, verify the token is present:

```bash
cat .env.local | grep SANITY_API_TOKEN
```

---

## Step 2: Execute Test Data Seeding Script

Run the seed script that was previously created:

```bash
node scripts/seed-data.mjs
```

Expected output:
```
🌱 Sanity テストデータ投入を開始します...
✅ siteSettings: siteSettings
✅ profile: profile
✅ service: service-ai-video
✅ service: service-ai-manga
✅ service: service-design
✅ work: work-ai-video-sample
✅ work: work-ai-manga-sample
🎉 テストデータ投入完了!
   成功: 7 件
   失敗: 0 件
```

---

## Step 3: Verify Data Entry

Run the verification script:

```bash
node scripts/verify-data.mjs
```

Expected output:
```
🔍 Sanity データ検証を開始します...
📋 1. サイト設定 (siteSettings)
   ✅ データ確認: AIで、映像の常識を変える
📋 2. プロフィール (profile)
   ✅ データ確認: 林 憲二郎
📋 3. サービス (service)
   ✅ データ確認: 3 件
📋 4. 制作実績 (work)
   ✅ データ確認: 2 件
🎉 すべてのデータが正常に確認できました！
```

---

## Step 4: Verify in Sanity Studio (Using Playwright MCP)

1. Start dev server if not running:

```bash
npm run dev
```

2. Use Playwright MCP to navigate to `http://localhost:3000/studio`

3. Verify the following in Sanity Studio sidebar:
   - サイト設定 (siteSettings): 1 document
   - プロフィール (profile): 1 document
   - サービス (service): 3 documents
   - 制作実績 (work): 2 documents

---

## Step 5: Report Results

Report in the following format:

### If Successful

```
✅ Phase 2 Complete - Test Data Entry Successful

【Environment Setup】
- .env.local: ✅ SANITY_API_TOKEN added

【Seeding Results】
- siteSettings: ✅ 1 document
- profile: ✅ 1 document
- service: ✅ 3 documents
- work: ✅ 2 documents

【Verification Results】
- verify-data.mjs: ✅ All data confirmed
- Sanity Studio: ✅ Display confirmed

【Next Step】
Ready to proceed to Phase 3 (Frontend Implementation) - Design Planning (Plan Mode)
```

### If Failed

```
❌ Phase 2 Failed

【Step Failed】
[Which step failed]

【Error Details】
[Error message]

【Attempted Solutions】
[What was tried]

【Recommendation】
[Suggested next action]
```

---

## Important Notes

- Do NOT commit .env.local to git repository
- If seed script fails, check if token has Editor permissions
- If scripts directory or files don't exist, report the error
