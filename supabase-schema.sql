CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL DEFAULT '', furigana TEXT DEFAULT '', dob DATE, phone TEXT DEFAULT '', email TEXT DEFAULT '',
  occupation TEXT DEFAULT '', occupation_other TEXT DEFAULT '', contact_pref TEXT[] DEFAULT '{}',
  source TEXT DEFAULT '', referral_type TEXT DEFAULT '', referrer_name TEXT DEFAULT '',
  search_kw TEXT[] DEFAULT '{}', search_kw_other TEXT DEFAULT '',
  purposes TEXT[] DEFAULT '{}', body_parts TEXT[] DEFAULT '{}', symptoms TEXT[] DEFAULT '{}',
  is_post_op BOOLEAN DEFAULT false,
  surgery_type TEXT DEFAULT '', surgery_type_other TEXT DEFAULT '', surgery_date DATE, surgery_clinic TEXT DEFAULT '', surgery_note TEXT DEFAULT '',
  health TEXT[] DEFAULT '{}', health_f TEXT[] DEFAULT '{}', sleep_quality TEXT DEFAULT '', exercise TEXT DEFAULT '',
  photo_consent TEXT DEFAULT '', sns_consent TEXT DEFAULT '',
  therapist_memo TEXT DEFAULT '', treatment_ended_at TIMESTAMPTZ,
  p2_completed_at TIMESTAMPTZ, p2_feedback TEXT[] DEFAULT '{}', p2_next_booking TEXT DEFAULT '', p2_visit_freq TEXT DEFAULT '',
  p3_completed_at TIMESTAMPTZ, p3_satisfaction INT DEFAULT 0, p3_review_ok TEXT DEFAULT '',
  p3_site_rating INT DEFAULT 0, p3_site_missing TEXT[] DEFAULT '{}', p3_site_feedback TEXT DEFAULT '',
  p3_reasons TEXT[] DEFAULT '{}', p3_reasons_other TEXT DEFAULT '',
  p3_booking_trigger TEXT[] DEFAULT '{}', p3_booking_trigger_other TEXT DEFAULT '',
  p3_hesitation TEXT[] DEFAULT '{}', p3_compare_salons TEXT DEFAULT '',
  p3_cross_gym TEXT DEFAULT '', p3_cross_gym_reason TEXT[] DEFAULT '{}', p3_cross_marriage TEXT DEFAULT '', p3_comment TEXT DEFAULT ''
);
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX idx_customers_name ON customers (name);
CREATE INDEX idx_customers_created ON customers (created_at DESC);
