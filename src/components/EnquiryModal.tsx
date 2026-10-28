import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SPECIES = ['Broiler', 'Layer', 'Breeder', 'Aqua', 'Cattle', 'Other'];

export default function EnquiryModal({ open, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    species: 'Broiler',
    message: '',
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please add at least your name and phone');
      return;
    }
    // No server behind this site: the enquiry is handed to WhatsApp, addressed to our sales line,
    // so it only goes out when the visitor presses send there.
    const text = [
      'Hivetz enquiry',
      `Name: ${form.name}`,
      form.company && `Company / farm: ${form.company}`,
      `Phone: ${form.phone}`,
      `Species: ${form.species}`,
      form.message && `Need: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n');
    setSubmitting(true);
    window.open(`https://wa.me/917010071262?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSubmitting(false);
    toast.success('Your enquiry is ready in WhatsApp. Press send there.');
    setForm({ name: '', company: '', phone: '', species: 'Broiler', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-300/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-3xl glass overflow-hidden"
          >
            <div className="flex items-start justify-between p-6 border-b border-forest-900/10 dark:border-honey-400/15">
              <div>
                <div className="eyebrow text-forest-800 dark:text-honey-300/70 mb-1">
                  Quick Enquiry
                </div>
                <h3 className="font-display text-2xl font-bold text-forest-900 dark:text-honey-600">
                  Tell us about your flock.
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="h-9 w-9 rounded-full flex items-center justify-center
                           hover:bg-forest-900/5 dark:hover:bg-honey-400/10"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Full name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Rajeev Menon"
                required
              />
              <Input
                label="Company / Farm"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                placeholder="Coastal Broilers Pvt Ltd"
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+91 ..."
                required
              />

              <div>
                <label className="eyebrow text-forest-900 dark:text-honey-200/70 mb-2 block">
                  Species
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, species: s })}
                      className={`text-xs font-semibold tracking-wider uppercase
                                  px-3 py-2 rounded-full border transition
                                  ${
                                    form.species === s
                                      ? 'bg-forest-900 text-cream-50 border-forest-900 dark:bg-honey-400 dark:text-ink-300 dark:border-honey-400'
                                      : 'border-forest-900/15 dark:border-honey-400/20'
                                  }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="eyebrow text-forest-900 dark:text-honey-200/70 mb-2 block">
                  What's the challenge?
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Current FCR, mycotoxin exposure, mortality, etc."
                  className="w-full rounded-xl px-4 py-3 bg-cream-50 dark:bg-cream-50
                             border border-forest-900/15 dark:border-honey-400/20
                             text-forest-900 dark:text-honey-600
                             placeholder:text-forest-900/75 dark:placeholder:text-honey-700/40
                             outline-none focus:border-forest-700 dark:focus:border-honey-400 transition"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send enquiry'}
                {!submitting && <Send size={16} />}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow text-forest-900 dark:text-honey-200/70 mb-2 block">
        {label}
        {required && <span className="text-forest-700 dark:text-honey-400 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl px-4 py-3 bg-cream-50 dark:bg-cream-50
                   border border-forest-900/15 dark:border-honey-400/20
                   text-forest-900 dark:text-honey-600
                   placeholder:text-forest-900/75 dark:placeholder:text-honey-700/40
                   outline-none focus:border-forest-700 dark:focus:border-honey-400 transition"
      />
    </div>
  );
}
