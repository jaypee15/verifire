import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge, Shield, Award, CheckCircle } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Issue Verifiable Digital Credentials with Confidence
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Create, issue, and verify digital badges that showcase achievements and skills using the Open Badges 3.0 standard.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/badges/verify">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Verify a Badge
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-4 bg-background"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeIn}
          >
            Everything You Need for Digital Credentials
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Badge className="w-10 h-10" />}
              title="Easy Badge Creation"
              description="Create beautiful, standards-compliant badges in minutes with our intuitive interface."
              delay={0.2}
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="Secure & Verifiable"
              description="Every badge is cryptographically secured and instantly verifiable."
              delay={0.4}
            />
            <FeatureCard
              icon={<Award className="w-10 h-10" />}
              title="Open Standards"
              description="Full compliance with Open Badges 3.0 specification for maximum portability."
              delay={0.6}
            />
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        className="py-20 px-4 bg-background"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <div className="space-y-4">
                <BenefitItem text="Instant badge verification" />
                <BenefitItem text="Customizable badge templates" />
                <BenefitItem text="Bulk issuance capabilities" />
                <BenefitItem text="Detailed analytics and tracking" />
                <BenefitItem text="API access for integration" />
                <BenefitItem text="Secure credential storage" />
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video rounded-lg bg-muted"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-4 bg-primary text-primary-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Start Issuing Digital Credentials?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of organizations already using our platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Create Your Free Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="p-6 rounded-lg border bg-card"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { delay }
        }
      }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <motion.div 
      className="flex items-center gap-2"
      variants={{
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 }
      }}
    >
      <CheckCircle className="w-5 h-5 text-primary" />
      <span>{text}</span>
    </motion.div>
  );
}

export default LandingPage; 