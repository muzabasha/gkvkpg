import React, { useRef, useEffect, useState } from 'react';
import { SYLLABUS } from '../data/syllabus';
import type { Topic } from '../data/syllabus';
import { Lock } from 'lucide-react';

interface TopicDependencyProps {
  currentTopicId: string;
  completedTopics: string[];
  setTopic: (id: string) => void;
}

interface NodePosition {
  id: string;
  title: string;
  x: number;
  y: number;
  status: 'active' | 'completed' | 'available' | 'locked';
  prereqs: string[];
}

export const TopicDependency: React.FC<TopicDependencyProps> = ({
  currentTopicId,
  completedTopics,
  setTopic,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });

  // Update canvas size based on parent container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: Math.max(containerRef.current.clientWidth, 800),
          height: 700
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if topic is locked based on prerequisite completion
  const isTopicLocked = () => {
    return false; // Completely unlock all topics for navigability and auditing
  };

  // Generate node coordinates
  // Layout strategy: Columns represent Units (4 columns: Unit 1, Unit 2, Unit 3, Unit 4)
  const columns: Topic[][] = [[], [], [], []];
  
  SYLLABUS.forEach(block => {
    block.units.forEach(unit => {
      let colIdx = 0;
      if (unit.id === 'unit-1') colIdx = 0;
      else if (unit.id === 'unit-2') colIdx = 1;
      else if (unit.id === 'unit-3') colIdx = 2;
      else if (unit.id === 'unit-4') colIdx = 3;

      unit.topics.forEach(topic => {
        columns[colIdx].push(topic);
      });
    });
  });

  const nodes: NodePosition[] = [];
  const paddingX = 80;
  const paddingY = 60;
  const colWidth = (dimensions.width - paddingX * 2) / 3;

  columns.forEach((columnTopics, colIdx) => {
    const totalInCol = columnTopics.length;
    const colX = paddingX + colIdx * colWidth;

    columnTopics.forEach((topic, topicIdx) => {
      // Vertically space them out centered
      const spacingY = (dimensions.height - paddingY * 2) / Math.max(totalInCol, 1);
      const colY = paddingY + topicIdx * spacingY + spacingY / 2;

      let status: NodePosition['status'] = 'available';
      if (topic.id === currentTopicId) {
        status = 'active';
      } else if (completedTopics.includes(topic.id)) {
        status = 'completed';
      } else if (isTopicLocked()) {
        status = 'locked';
      }

      nodes.push({
        id: topic.id,
        title: topic.title,
        x: colX,
        y: colY,
        status,
        prereqs: topic.prerequisites,
      });
    });
  });

  // Generate links
  const links: { from: NodePosition; to: NodePosition }[] = [];
  nodes.forEach(toNode => {
    toNode.prereqs.forEach(prereqId => {
      const fromNode = nodes.find(n => n.id === prereqId);
      if (fromNode) {
        links.push({ from: fromNode, to: toNode });
      }
    });
  });

  return (
    <div className="w-full interactive-card p-6">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-brandDark-900 dark:text-white m-0">
            Syllabus Dependency Path
          </h3>
          <p className="text-sm text-brandDark-500 dark:text-brandDark-400 m-0">
            NEP 2020 sequential map. Click on any unlocked topic node to navigate.
          </p>
        </div>
        
        {/* Graph Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-primary-600 border border-primary-700" />
            <span className="text-brandDark-700 dark:text-brandDark-300">Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 border border-emerald-600" />
            <span className="text-brandDark-700 dark:text-brandDark-300">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-white dark:bg-brandDark-800 border border-brandDark-300 dark:border-brandDark-700" />
            <span className="text-brandDark-700 dark:text-brandDark-300">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-brandDark-200 dark:bg-brandDark-900 border border-brandDark-300 dark:border-brandDark-800 opacity-50 flex items-center justify-center">
              <Lock size={8} className="text-brandDark-400" />
            </span>
            <span className="text-brandDark-700 dark:text-brandDark-300">Locked (Prerequisites needed)</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="w-full overflow-x-auto bg-white dark:bg-brandDark-950/40 backdrop-blur-sm rounded-xl border border-brandDark-200 dark:border-brandDark-850 shadow-inner">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="mx-auto select-none"
        >
          {/* Definitions for arrow markers and glow filters */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-brandDark-300 dark:text-brandDark-700" />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw Connection Paths */}
          {links.map((link, idx) => {
            const isCompletedLink = completedTopics.includes(link.from.id) && completedTopics.includes(link.to.id);
            const isActiveLink = link.from.id === currentTopicId || link.to.id === currentTopicId;
            
            // Generate nice S-curve paths (cubic bezier)
            const controlOffset = colWidth / 2;
            const d = `M ${link.from.x + 10} ${link.from.y} C ${link.from.x + controlOffset} ${link.from.y}, ${link.to.x - controlOffset} ${link.to.y}, ${link.to.x - 10} ${link.to.y}`;

            return (
              <path
                key={idx}
                d={d}
                fill="none"
                stroke={
                  isCompletedLink
                    ? '#10b981' // emerald
                    : isActiveLink
                    ? '#3b82f6' // blue
                    : '#cbd5e1' // slate default
                }
                strokeWidth={isCompletedLink || isActiveLink ? 3.5 : 2}
                className={`transition-colors duration-300 opacity-60 ${
                  isCompletedLink ? 'stroke-dasharray-none' : 'stroke-dasharray-3'
                } dark:opacity-40`}
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Draw Nodes */}
          {nodes.map(node => {
            const width = 160;
            const height = 54;
            const rx = 12;

            let bgColor = 'bg-white dark:bg-brandDark-800';
            let strokeColor = 'stroke-brandDark-300 dark:stroke-brandDark-700';
            let textColor = 'text-brandDark-800 dark:text-brandDark-200';
            let hoverStyle = 'hover:scale-[1.04] cursor-pointer';

            if (node.status === 'active') {
              bgColor = 'bg-primary-600 dark:bg-primary-600';
              strokeColor = 'stroke-primary-500';
              textColor = 'text-white';
              hoverStyle = 'scale-[1.03] shadow-lg';
            } else if (node.status === 'completed') {
              bgColor = 'bg-emerald-50 dark:bg-emerald-950/20';
              strokeColor = 'stroke-emerald-500';
              textColor = 'text-emerald-800 dark:text-emerald-400';
            } else if (node.status === 'locked') {
              bgColor = 'bg-brandDark-100/50 dark:bg-brandDark-900/50';
              strokeColor = 'stroke-brandDark-200 dark:stroke-brandDark-800';
              textColor = 'text-brandDark-400 dark:text-brandDark-600';
              hoverStyle = 'cursor-not-allowed opacity-50';
            }

            return (
              <g
                key={node.id}
                transform={`translate(${node.x - width / 2}, ${node.y - height / 2})`}
                className={`transition-all duration-300 ${hoverStyle}`}
                onClick={() => node.status !== 'locked' && setTopic(node.id)}
              >
                {/* Node Box */}
                <rect
                  width={width}
                  height={height}
                  rx={rx}
                  className={`${bgColor} ${strokeColor} stroke-2 transition-all duration-300 fill-current`}
                  filter={node.status === 'active' ? 'url(#glow)' : undefined}
                />
                
                {/* Node Text */}
                <foreignObject x={10} y={4} width={width - 34} height={height - 8}>
                  <div className={`h-full flex items-center justify-center text-center font-bold text-[11px] leading-tight select-none ${textColor}`}>
                    <span className="line-clamp-2">{node.title}</span>
                  </div>
                </foreignObject>

                {/* Status Indicator Icon inside Node */}
                <g transform={`translate(${width - 24}, ${height / 2 - 8})`}>
                  {node.status === 'completed' && (
                    <circle cx="8" cy="8" r="8" className="fill-emerald-500 text-white" />
                  )}
                  {node.status === 'completed' && (
                    <path
                      d="M5 8 l2 2 l4 -4"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                  )}
                  {node.status === 'locked' && (
                    <circle cx="8" cy="8" r="8" className="fill-brandDark-300 dark:fill-brandDark-800 text-brandDark-500" />
                  )}
                  {node.status === 'locked' && (
                    <path
                      d="M6 9 v-2 a2 2 0 0 1 4 0 v2 m-5 0 h6 v5 h-6 z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-brandDark-500 dark:text-brandDark-400"
                    />
                  )}
                  {node.status === 'active' && (
                    <circle cx="8" cy="8" r="8" className="fill-white text-primary-600" />
                  )}
                  {node.status === 'active' && (
                    <circle cx="8" cy="8" r="3.5" className="fill-primary-600" />
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
export default TopicDependency;
