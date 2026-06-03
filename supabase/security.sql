-- Run once in Supabase SQL Editor (Dashboard → SQL → New query)

alter table profiles enable row level security;
alter table families enable row level security;
alter table transactions enable row level security;
alter table budget_rules enable row level security;
alter table cards enable row level security;
alter table subscriptions enable row level security;

create table if not exists audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  family_id uuid references families(id),
  action text not null,
  details jsonb,
  ip_address text,
  created_at timestamp default now()
);

alter table audit_logs enable row level security;

drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

drop policy if exists "Users can view own family" on families;
create policy "Users can view own family" on families for select using (
  id in (select family_id from profiles where id = auth.uid())
);

drop policy if exists "Users can view family transactions" on transactions;
create policy "Users can view family transactions" on transactions for select using (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can insert family transactions" on transactions;
create policy "Users can insert family transactions" on transactions for insert with check (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can update family transactions" on transactions;
create policy "Users can update family transactions" on transactions for update using (
  family_id in (select family_id from profiles where id = auth.uid())
);

drop policy if exists "Users can view family budgets" on budget_rules;
create policy "Users can view family budgets" on budget_rules for select using (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can insert family budgets" on budget_rules;
create policy "Users can insert family budgets" on budget_rules for insert with check (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can update family budgets" on budget_rules;
create policy "Users can update family budgets" on budget_rules for update using (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can delete family budgets" on budget_rules;
create policy "Users can delete family budgets" on budget_rules for delete using (
  family_id in (select family_id from profiles where id = auth.uid())
);

drop policy if exists "Users can view family cards" on cards;
create policy "Users can view family cards" on cards for select using (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can insert family cards" on cards;
create policy "Users can insert family cards" on cards for insert with check (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can update family cards" on cards;
create policy "Users can update family cards" on cards for update using (
  family_id in (select family_id from profiles where id = auth.uid())
);

drop policy if exists "Users can view family subscriptions" on subscriptions;
create policy "Users can view family subscriptions" on subscriptions for select using (
  family_id in (select family_id from profiles where id = auth.uid())
);
drop policy if exists "Users can insert family subscriptions" on subscriptions;
create policy "Users can insert family subscriptions" on subscriptions for insert with check (
  family_id in (select family_id from profiles where id = auth.uid())
);

drop policy if exists "Users can view own audit logs" on audit_logs;
create policy "Users can view own audit logs" on audit_logs for select using (user_id = auth.uid());
drop policy if exists "Users can insert own audit logs" on audit_logs;
create policy "Users can insert own audit logs" on audit_logs for insert with check (user_id = auth.uid());
