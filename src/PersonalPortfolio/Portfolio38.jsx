import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { ChevronLeft, Folder, FileCode, Coffee, Github, Terminal, ArrowRight, CornerDownRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const CodeLine = ({ num, children, indent = 0 }) => (
    <View style={[styles.codeLine, { paddingLeft: indent * 20 }]}>
        <Text style={styles.lineNumber}>{num.toString().padStart(2, ' ')}</Text>
        <View style={styles.lineContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio38({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={20} color="#6B7280" />
                    </TouchableOpacity>
                    
                    <View style={styles.fileTree}>
                        <View style={styles.treeItem}>
                            <Folder size={14} color="#60A5FA" />
                            <Text style={styles.treeText}>src</Text>
                        </View>
                        <View style={[styles.treeItem, { marginLeft: 16 }]}>
                            <Folder size={14} color="#60A5FA" />
                            <Text style={styles.treeText}>profile</Text>
                        </View>
                        <View style={[styles.treeItem, { marginLeft: 32 }]}>
                            <FileCode size={14} color="#FACC15" />
                            <Text style={[styles.treeText, styles.treeActive]}>Overview.js</Text>
                        </View>
                        <View style={[styles.treeItem, { marginLeft: 32 }]}>
                            <FileCode size={14} color="#FACC15" />
                            <Text style={styles.treeText}>Skills.ts</Text>
                        </View>
                        <View style={[styles.treeItem, { marginLeft: 16 }]}>
                            <Folder size={14} color="#60A5FA" />
                            <Text style={styles.treeText}>projects</Text>
                        </View>
                    </View>

                    <View style={styles.sidebarFooter}>
                        <Github size={18} color="#6B7280" />
                        <Terminal size={18} color="#6B7280" />
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.editor}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.tabs}>
                        <View style={styles.tabActive}>
                            <FileCode size={12} color="#FACC15" />
                            <Text style={styles.tabText}>Overview.js</Text>
                        </View>
                        <View style={styles.tabInactive}>
                            <Text style={styles.tabText}>Skills.ts</Text>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.editorContent}>
                        {/* Section 1: Definition */}
                        <CodeLine num={1}><Text style={styles.keyword}>const</Text><Text style={styles.variable}> profile </Text><Text style={styles.operator}>=</Text><Text style={styles.bracket}> {'{'}</Text></CodeLine>
                        <CodeLine num={2} indent={1}><Text style={styles.property}>name: </Text><Text style={styles.string}>"{personal_info.name}"</Text><Text style={styles.comma}>,</Text></CodeLine>
                        <CodeLine num={3} indent={1}><Text style={styles.property}>title: </Text><Text style={styles.string}>"{personal_info.title}"</Text><Text style={styles.comma}>,</Text></CodeLine>
                        <CodeLine num={4} indent={1}><Text style={styles.property}>manifesto: </Text><Text style={styles.string}>`{personal_info.headline}`</Text><Text style={styles.comma}>,</Text></CodeLine>
                        <CodeLine num={5}><Text style={styles.bracket}>{'}'}</Text><Text style={styles.operator}>;</Text></CodeLine>
                        
                        <View style={styles.codeSpacer} />

                        {/* Section 2: Summary */}
                        <CodeLine num={7}><Text style={styles.comment}>/** @description Project Narrative */</Text></CodeLine>
                        <CodeLine num={8}><Text style={styles.keyword}>function</Text><Text style={styles.func}> getMission</Text><Text style={styles.bracket}>() {'{'}</Text></CodeLine>
                        <CodeLine num={9} indent={1}><Text style={styles.keyword}>return </Text><Text style={styles.string}>`{summary.slice(0, 150)}...`</Text><Text style={styles.operator}>;</Text></CodeLine>
                        <CodeLine num={10}><Text style={styles.bracket}>{'}'}</Text></CodeLine>

                        <View style={styles.codeSpacer} />

                        {/* Section 3: Technical Stack */}
                        <CodeLine num={12}><Text style={styles.keyword}>export const </Text><Text style={styles.variable}>stack </Text><Text style={styles.operator}>=</Text><Text style={styles.bracket}> [</Text></CodeLine>
                        {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 2)).map((skill, i) => (
                            <CodeLine key={skill} num={13 + i} indent={1}><Text style={styles.string}>"{skill}"</Text><Text style={styles.comma}>,</Text></CodeLine>
                        ))}
                        <CodeLine num={13 + technical_stack.mobile.length + 2}><Text style={styles.bracket}>]</Text><Text style={styles.operator}>;</Text></CodeLine>

                        <View style={styles.codeSpacer} />

                        {/* Section 4: Projects (Array Map style) */}
                        <CodeLine num={20}><Text style={styles.comment}>// Active Repositories</Text></CodeLine>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectBlock}>
                                <View style={styles.projectIndex}><Text style={styles.indexText}>0{i+1}</Text></View>
                                <View style={styles.projectDetails}>
                                    <View style={styles.projectTop}>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                        <CornerDownRight size={14} color="#6B7280" />
                                    </View>
                                    <Text style={styles.projectDesc}>{p.description.slice(0, 80)}...</Text>
                                    <View style={styles.projectMeta}>
                                        <View style={styles.tag}><Text style={styles.tagText}>{p.category.toUpperCase()}</Text></View>
                                        <View style={styles.tag}><Text style={styles.tagText}>STABLE</Text></View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}

                        {/* Export Button */}
                        <TouchableOpacity style={styles.exportBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.exportText}>git commit -m "Initialize Contact"</Text>
                            <ArrowRight size={16} color="#FFF" />
                        </TouchableOpacity>

                        <View style={styles.editorPadding} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        flexDirection: 'row',
    },
    sidebar: {
        width: 130,
        backgroundColor: '#191919',
        borderRightWidth: 1,
        borderRightColor: '#2D2D2D',
    },
    backBtn: {
        padding: 20,
        marginBottom: 20,
    },
    fileTree: {
        paddingHorizontal: 12,
        gap: 12,
    },
    treeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    treeText: {
        fontSize: 11,
        color: '#858585',
        fontWeight: '500',
    },
    treeActive: {
        color: '#E1E1E1',
        fontWeight: '700',
    },
    sidebarFooter: {
        marginTop: 'auto',
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    editor: {
        flex: 1,
    },
    tabs: {
        height: 35,
        backgroundColor: '#141414',
        flexDirection: 'row',
    },
    tabActive: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 16,
        gap: 8,
        borderTopWidth: 2,
        borderTopColor: '#3B82F6',
    },
    tabInactive: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        opacity: 0.4,
    },
    tabText: {
        fontSize: 10,
        color: '#FFF',
        fontWeight: '600',
    },
    editorContent: {
        paddingTop: 20,
    },
    codeLine: {
        flexDirection: 'row',
        height: 24,
        alignItems: 'center',
    },
    lineNumber: {
        width: 40,
        fontSize: 10,
        color: '#4B5563',
        textAlign: 'center',
        fontFamily: 'monospace',
    },
    lineContent: {
        flexDirection: 'row',
        flex: 1,
    },
    codeSpacer: {
        height: 24,
    },
    keyword: { color: '#C678DD', fontFamily: 'monospace', fontSize: 13 },
    variable: { color: '#E06C75', fontFamily: 'monospace', fontSize: 13 },
    operator: { color: '#56B6C2', fontFamily: 'monospace', fontSize: 13 },
    bracket: { color: '#ABB2BF', fontFamily: 'monospace', fontSize: 13 },
    property: { color: '#D19A66', fontFamily: 'monospace', fontSize: 13 },
    string: { color: '#98C379', fontFamily: 'monospace', fontSize: 13 },
    comma: { color: '#ABB2BF', fontFamily: 'monospace', fontSize: 13 },
    comment: { color: '#5C6370', fontFamily: 'monospace', fontSize: 13, fontStyle: 'italic' },
    func: { color: '#61AFEF', fontFamily: 'monospace', fontSize: 13 },
    
    projectBlock: {
        marginHorizontal: 16,
        marginVertical: 12,
        padding: 20,
        backgroundColor: '#252525',
        borderRadius: 8,
        flexDirection: 'row',
        gap: 16,
        borderWidth: 1,
        borderColor: '#2D2D2D',
    },
    projectIndex: {
        width: 30,
        height: 30,
        borderRadius: 4,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    indexText: {
        fontSize: 10,
        color: '#60A5FA',
        fontWeight: 'bold',
    },
    projectDetails: {
        flex: 1,
    },
    projectTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    projectName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E1E1E1',
        letterSpacing: 1,
    },
    projectDesc: {
        fontSize: 12,
        color: '#858585',
        lineHeight: 18,
        marginBottom: 12,
    },
    projectMeta: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#1E1E1E',
        borderRadius: 4,
    },
    tagText: {
        fontSize: 8,
        color: '#6B7280',
        fontWeight: '900',
    },
    exportBtn: {
        margin: 16,
        backgroundColor: '#3B82F6',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    exportText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '900',
        fontFamily: 'monospace',
    },
    editorPadding: {
        height: 60,
    }
});
