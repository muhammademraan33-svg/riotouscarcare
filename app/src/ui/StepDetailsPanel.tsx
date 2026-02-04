import type { Step } from "../pages/Home";

export function StepDetailsPanel({ step }: { step: Step }) {
  return (
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-riot-line bg-black/40 text-sm font-black text-riot-ember2">
              {step.number}
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.24em] text-riot-muted">
                RIOT LINE
              </div>
              <div className="text-2xl font-black tracking-[0.16em] text-riot-text">
                {step.label}
              </div>
            </div>
          </div>
          {step.subtitle && (
            <div className="mt-2 text-sm font-medium text-riot-text/80">
              {step.subtitle}
            </div>
          )}
        </div>

        <div className="hidden rounded-full border border-riot-line bg-black/35 px-3 py-2 text-[11px] font-semibold tracking-widest text-riot-text/80 sm:inline-flex">
          X-DIRTY DETAILS
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="riot-panel rounded-xl p-4">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-riot-muted">
            CAPABILITIES
          </div>
          <ul className="mt-3 space-y-2 text-sm text-riot-text/85">
            {step.bullets?.map((b: string) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-[2px] inline-block h-4 w-4 rounded border border-riot-ember/50 bg-riot-ember/15" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="riot-panel rounded-xl p-4">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-riot-muted">
            DEPLOYMENT PROTOCOL
          </div>
          <ul className="mt-3 space-y-2 text-sm text-riot-text/85">
            <li className="flex items-start gap-2">
              <span className="mt-[2px] inline-block h-4 w-4 rounded border border-riot-line bg-black/35" />
              <span>Follow step intent and dwell time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] inline-block h-4 w-4 rounded border border-riot-line bg-black/35" />
              <span>Rinse thoroughly before proceeding</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] inline-block h-4 w-4 rounded border border-riot-line bg-black/35" />
              <span>Hand off to the next stage cleanly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

