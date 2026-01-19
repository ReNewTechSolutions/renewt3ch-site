<!-- FILE: docs/DOMAIN-HANDOFF_IONOS.md -->

# Domain handoff (IONOS)

## Two common options

### Option A: IONOS account “push” (fastest)
Best if buyer has (or can create) an IONOS account.

High-level steps:
1) Buyer provides their IONOS account email/identifier
2) Seller initiates an internal transfer/push
3) Buyer accepts
4) Buyer controls DNS + renewal going forward

### Option B: Transfer out with auth/EPP code
Best if buyer wants to move the domain to another registrar.

High-level steps:
1) Unlock domain in IONOS
2) Request auth/EPP code
3) Buyer starts transfer at their registrar
4) Buyer enters auth/EPP code
5) Transfer completes (timing depends on registrar)

## What to send buyer
- Domain name
- Which option you’re using (A or B)
- If Option B: auth/EPP code
- DNS doc: `IONOS-DNS-RECORDS.md`

## Timing notes
- Avoid downtime by deploying first, then cutting DNS over.
- If buyer wants uninterrupted demo access, keep current DNS until new host is confirmed live.

## Post-transfer verification
- Buyer confirms ownership in their registrar
- Buyer confirms DNS access
- Buyer confirms site resolves and SSL is active